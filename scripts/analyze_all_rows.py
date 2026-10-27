import zipfile
import xml.etree.ElementTree as ET
import re

DOCX_FILES = [
    ('GRAMPOS,PRESILHAS,BATENTES E ACABAMENTOS...docx', 'Doc1'),
    ('PEÇAS (MIUDEZAS) CATALOGO 2.docx', 'Doc2')
]

W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
A_NS = 'http://schemas.openxmlformats.org/drawingml/2006/main'
R_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
V_NS = 'urn:schemas-microsoft-com:vml'

ns = {'w': W_NS, 'a': A_NS, 'r': R_NS, 'v': V_NS}

total_items = 0
items_with_img = 0
items_visual_only = 0
items_full = 0
category_counts = {}

def clean_text(cell):
    parts = [node.text for node in cell.iter(f'{{{W_NS}}}t') if node.text]
    return " ".join(parts).strip()

def get_images(cell, rels):
    imgs = []
    for blip in cell.iter(f'{{{A_NS}}}blip'):
        r_id = blip.attrib.get(f'{{{R_NS}}}embed')
        if r_id and r_id in rels:
            imgs.append(rels[r_id])
    for v_img in cell.iter(f'{{{V_NS}}}imagedata'):
        r_id = v_img.attrib.get(f'{{{R_NS}}}id')
        if r_id and r_id in rels:
            imgs.append(rels[r_id])
    return imgs

for docx_path, doc_label in DOCX_FILES:
    with zipfile.ZipFile(docx_path) as z:
        rels_xml = z.read('word/_rels/document.xml.rels')
        rels_tree = ET.fromstring(rels_xml)
        rels = {r.attrib.get('Id'): r.attrib.get('Target') for r in rels_tree}

        tree = ET.fromstring(z.read('word/document.xml'))
        body = tree.find('w:body', ns)
        current_heading = "Geral"

        for child in body:
            tag = child.tag.split('}')[-1]
            if tag == 'p':
                txt = " ".join(t.text for t in child.iter(f'{{{W_NS}}}t') if t.text).strip()
                if txt and len(txt) > 2 and not any(h in txt.upper() for h in ['ITEM', 'DESCRI', 'CAIXA']):
                    current_heading = txt
            elif tag == 'tbl':
                rows = child.findall('w:tr', ns)
                for r_idx, row in enumerate(rows):
                    cells = row.findall('w:tc', ns)
                    if len(cells) < 3:
                        continue
                    
                    # Check left product (col 0, 1, 2)
                    left_img = get_images(cells[0], rels) if len(cells) > 0 else []
                    left_desc = clean_text(cells[1]) if len(cells) > 1 else ""
                    left_box = clean_text(cells[2]) if len(cells) > 2 else ""

                    # Check right product (col 3, 4, 5)
                    right_img = get_images(cells[3], rels) if len(cells) > 3 else []
                    right_desc = clean_text(cells[4]) if len(cells) > 4 else ""
                    right_box = clean_text(cells[5]) if len(cells) > 5 else ""

                    # Process left
                    if not (left_desc.upper().startswith('DESCRI') or left_box.upper().startswith('CAIXA')):
                        if left_img or left_desc or left_box:
                            total_items += 1
                            if left_img:
                                items_with_img += 1
                            if left_img and left_box and not left_desc:
                                items_visual_only += 1
                            else:
                                items_full += 1
                            category_counts[current_heading] = category_counts.get(current_heading, 0) + 1

                    # Process right
                    if not (right_desc.upper().startswith('DESCRI') or right_box.upper().startswith('CAIXA')):
                        if right_img or right_desc or right_box:
                            total_items += 1
                            if right_img:
                                items_with_img += 1
                            if right_img and right_box and not right_desc:
                                items_visual_only += 1
                            else:
                                items_full += 1
                            category_counts[current_heading] = category_counts.get(current_heading, 0) + 1

print(f'Total items: {total_items}')
print(f'Items with image: {items_with_img}')
print(f'Items visual only (image + box, no desc): {items_visual_only}')
print(f'Category counts:')
for cat, cnt in category_counts.items():
    print(f'  {cat}: {cnt}')
