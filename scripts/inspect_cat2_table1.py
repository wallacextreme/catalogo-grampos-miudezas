import zipfile
import xml.etree.ElementTree as ET

DOCX_PATH = 'PEÇAS (MIUDEZAS) CATALOGO 2.docx'
W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
ns = {'w': W_NS}

with zipfile.ZipFile(DOCX_PATH) as z:
    tree = ET.fromstring(z.read('word/document.xml'))
    body = tree.find('w:body', ns)
    for child in body:
        tag = child.tag.split('}')[-1]
        if tag == 'tbl':
            rows = child.findall('w:tr', ns)
            print(f'First table rows count: {len(rows)}')
            for r_idx in range(min(15, len(rows))):
                cells = rows[r_idx].findall('w:tc', ns)
                texts = [" ".join(t.text for t in c.iter(f'{{{W_NS}}}t') if t.text).strip() for c in cells]
                print(f'Row {r_idx}: {texts}')
            break
