import zipfile
import xml.etree.ElementTree as ET

DOCX_FILES = [
    'GRAMPOS,PRESILHAS,BATENTES E ACABAMENTOS...docx',
    'PEÇAS (MIUDEZAS) CATALOGO 2.docx'
]
W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
ns = {'w': W_NS}

caixa_samples = set()
desc_samples = []

for docx_path in DOCX_FILES:
    with zipfile.ZipFile(docx_path) as z:
        tree = ET.fromstring(z.read('word/document.xml'))
        body = tree.find('w:body', ns)
        for child in body:
            if child.tag.endswith('tbl'):
                for row in child.findall('w:tr', ns):
                    cells = row.findall('w:tc', ns)
                    for col_idx in (2, 5):
                        if len(cells) > col_idx:
                            # inspect raw paragraphs inside cell to preserve line breaks
                            paras = []
                            for p in cells[col_idx].findall('w:p', ns):
                                pt = "".join(t.text for t in p.iter(f'{{{W_NS}}}t') if t.text).strip()
                                if pt:
                                    paras.append(pt)
                            raw_box = "\n".join(paras).strip()
                            if raw_box and raw_box.upper() != 'CAIXA':
                                caixa_samples.add(raw_box)
                    for col_idx in (1, 4):
                        if len(cells) > col_idx:
                            paras = []
                            for p in cells[col_idx].findall('w:p', ns):
                                pt = "".join(t.text for t in p.iter(f'{{{W_NS}}}t') if t.text).strip()
                                if pt:
                                    paras.append(pt)
                            raw_desc = " ".join(paras).strip()
                            if raw_desc and not raw_desc.upper().startswith('DESCRI'):
                                desc_samples.append(raw_desc)

print(f'Total unique CAIXA strings: {len(caixa_samples)}')
sample_boxes = sorted(list(caixa_samples))
print('Sample CAIXA strings (first 40):')
for s in sample_boxes[:40]:
    print('  ', repr(s))

print('\nSample CAIXA with newlines:')
with_newlines = [s for s in sample_boxes if '\n' in s]
print(f'Count with newlines: {len(with_newlines)}')
for s in with_newlines[:25]:
    print('  ', repr(s))

print('\nSample CAIXA with MU/LT/LF/COR/FT/AJ/GR:')
with_codes = [s for s in sample_boxes if any(p in s.upper() for p in ['MU', 'LT', 'LF', 'COR', 'FT', 'AJ', 'GR'])]
print(f'Count with codes: {len(with_codes)}')
for s in with_codes[:25]:
    print('  ', repr(s))
