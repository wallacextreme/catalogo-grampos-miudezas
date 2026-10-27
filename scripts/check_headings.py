import zipfile
import xml.etree.ElementTree as ET

W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
ns = {'w': W_NS}

for doc in ['GRAMPOS,PRESILHAS,BATENTES E ACABAMENTOS...docx', 'PEÇAS (MIUDEZAS) CATALOGO 2.docx']:
    with zipfile.ZipFile(doc) as z:
        tree = ET.fromstring(z.read('word/document.xml'))
        body = tree.find('w:body', ns)
        last_p = ''
        tbl_idx = 0
        for child in body:
            tag = child.tag.split('}')[-1]
            if tag == 'p':
                txt = ''.join(t.text for t in child.iter(f'{{{W_NS}}}t') if t.text).strip()
                if txt:
                    last_p = txt
            elif tag == 'tbl':
                tbl_idx += 1
                print(f'{doc} Tbl {tbl_idx}: last_p="{last_p}"')
