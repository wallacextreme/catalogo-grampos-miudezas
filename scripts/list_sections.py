import zipfile
import xml.etree.ElementTree as ET

DOCX_FILES = [
    'GRAMPOS,PRESILHAS,BATENTES E ACABAMENTOS...docx',
    'PEÇAS (MIUDEZAS) CATALOGO 2.docx'
]
W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
ns = {'w': W_NS}

for docx_path in DOCX_FILES:
    print('*** FILE:', docx_path)
    with zipfile.ZipFile(docx_path) as z:
        tree = ET.fromstring(z.read('word/document.xml'))
        body = tree.find('w:body', ns)
        current_h = 'Geral'
        t_idx = 0
        for child in body:
            tag = child.tag.split('}')[-1]
            if tag == 'p':
                txt = ' '.join(t.text for t in child.iter(f'{{{W_NS}}}t') if t.text).strip()
                if txt and len(txt) > 2:
                    current_h = txt
            elif tag == 'tbl':
                t_idx += 1
                rows = child.findall('w:tr', ns)
                print(f'  Table #{t_idx}: "{current_h}" ({len(rows)} rows)')
