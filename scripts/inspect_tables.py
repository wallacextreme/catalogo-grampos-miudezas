import zipfile
import xml.etree.ElementTree as ET

DOCX_FILES = [
    'GRAMPOS,PRESILHAS,BATENTES E ACABAMENTOS...docx',
    'PEÇAS (MIUDEZAS) CATALOGO 2.docx'
]

W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
A_NS = 'http://schemas.openxmlformats.org/drawingml/2006/main'
R_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
V_NS = 'urn:schemas-microsoft-com:vml'

ns = {
    'w': W_NS,
    'a': A_NS,
    'r': R_NS,
    'v': V_NS
}

for docx_path in DOCX_FILES:
    print('==============================================')
    print('INSPECTING:', docx_path)
    print('==============================================')
    with zipfile.ZipFile(docx_path) as z:
        # Load rels
        rels_xml = z.read('word/_rels/document.xml.rels')
        rels_tree = ET.fromstring(rels_xml)
        rels = {}
        for rel in rels_tree:
            r_id = rel.attrib.get('Id')
            target = rel.attrib.get('Target')
            rels[r_id] = target
        print(f'Total relationships: {len(rels)}')

        doc_xml = z.read('word/document.xml')
        tree = ET.fromstring(doc_xml)
        body = tree.find('w:body', ns)
        if body is None:
            print('No w:body found')
            continue

        # Iterate children of body: paragraphs and tables
        table_count = 0
        paragraph_count = 0
        current_heading = ""
        sample_rows = []

        for child in body:
            tag = child.tag.split('}')[-1]
            if tag == 'p':
                paragraph_count += 1
                texts = [node.text for node in child.iter(f'{{{W_NS}}}t') if node.text]
                full_text = " ".join(texts).strip()
                if full_text:
                    current_heading = full_text
            elif tag == 'tbl':
                table_count += 1
                rows = child.findall('w:tr', ns)
                print(f'\nTable #{table_count} under heading: "{current_heading}" (Rows: {len(rows)})')
                # Inspect first few rows
                for r_idx, row in enumerate(rows[:4]):
                    cells = row.findall('w:tc', ns)
                    cell_texts = []
                    cell_imgs = []
                    for c_idx, cell in enumerate(cells):
                        t_parts = [node.text for node in cell.iter(f'{{{W_NS}}}t') if node.text]
                        text = " ".join(t_parts).strip()
                        cell_texts.append(text)
                        
                        # Find images in this cell
                        imgs = []
                        for blip in cell.iter(f'{{{A_NS}}}blip'):
                            r_id = blip.attrib.get(f'{{{R_NS}}}embed')
                            if r_id and r_id in rels:
                                imgs.append(rels[r_id])
                        for v_img in cell.iter(f'{{{V_NS}}}imagedata'):
                            r_id = v_img.attrib.get(f'{{{R_NS}}}id')
                            if r_id and r_id in rels:
                                imgs.append(rels[r_id])
                        cell_imgs.append(imgs)
                    print(f'  Row {r_idx} (cols: {len(cells)}):')
                    for c_idx, (ct, ci) in enumerate(zip(cell_texts, cell_imgs)):
                        if ct or ci:
                            print(f'    Col {c_idx}: text="{ct[:40]}" imgs={ci}')
                    if r_idx == 1:
                        sample_rows.append((docx_path, current_heading, cell_texts, cell_imgs))

print('\nDone inspection!')
