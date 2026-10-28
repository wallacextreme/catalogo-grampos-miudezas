"""
extract_docx_catalogs.py - Engenharia Reversa de Catálogos Word (.docx)
Extrai todas as seções, produtos, códigos de caixa, códigos internos,
referências de fabricantes, aplicações veiculares, medidas técnicas
e imagens de alta fidelidade convertidas para WebP via webp_studio_converter.
"""

import json
import os
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from datetime import datetime

# Importar o estúdio de conversão WebP
sys.path.insert(0, os.path.dirname(__file__))
from webp_studio_converter import convert_image_bytes

DOCX_FILES = [
    {
        'path': 'GRAMPOS,PRESILHAS,BATENTES E ACABAMENTOS...docx',
        'default_category': 'Grampos, Presilhas, Batentes e Acabamentos'
    },
    {
        'path': 'PEÇAS (MIUDEZAS) CATALOGO 2.docx',
        'default_category': 'Reparos de Trambulador e Câmbio'
    }
]

OUTPUT_IMG_DIR = os.path.join('public', 'catalog-images', 'miudezas')
OUTPUT_SEED_JSON = os.path.join('public', 'catalog-master-seed.json')

W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
A_NS = 'http://schemas.openxmlformats.org/drawingml/2006/main'
R_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
V_NS = 'urn:schemas-microsoft-com:vml'

ns = {'w': W_NS, 'a': A_NS, 'r': R_NS, 'v': V_NS}

import unicodedata

def clean_key(s: str) -> str:
    nfkd = unicodedata.normalize('NFKD', s)
    ascii_str = ''.join(c for c in nfkd if not unicodedata.combining(c))
    return re.sub(r'[^A-Z0-9]', '', ascii_str.upper())

CATEGORY_RULES = [
    ('GRAMPO', 'Grampos, Presilhas, Batentes e Acabamentos'),
    ('PORCARAPIDA', 'Porca Rápida e Buchas de Fixação'),
    ('MOLA', 'Molas em Geral'),
    ('BANCO', 'Alças, Moldura e Kits Banco'),
    ('FAROL', 'Parafuso Fixação e Regulagem de Farol'),
    ('CASTELO', 'Castelo Vela (Tucho)'),
    ('TUCHO', 'Castelo Vela (Tucho)'),
    ('CALOTA', 'Calota Cubo Roda'),
    ('HOMOCINETICA', 'Porcas Ponta Eixo / Homocinética / Amortecedor'),
    ('PONTAEIXO', 'Porcas Ponta Eixo / Homocinética / Amortecedor'),
    ('CARTER', 'Bujão e Anéis de Cárter e Caixa'),
    ('SUSPENSAO', 'Parafuso Suspensão / Balança / Motor'),
    ('BALANCA', 'Parafuso Suspensão / Balança / Motor'),
    ('EMBREAGEM', 'Kit Embreagem e Kits de Pedal'),
    ('DIRE', 'Bucha Caixa Direção'),
    ('CONEX', 'Conexões e Engates Rápidos'),
    ('FREIO', 'Regulagem de Freio'),
    ('CATALOGO2', 'Reparos de Trambulador e Câmbio'),
]

def normalize_category(raw_heading: str, fallback: str) -> str:
    k = clean_key(raw_heading)
    for pattern, canonical in CATEGORY_RULES:
        if pattern in k:
            return canonical
    return fallback

CARMAKERS_KEYWORDS = {
    'VW': ['VW', 'VOLKS', 'VOLKSWAGEN', 'GOL', 'SANTANA', 'FOX', 'PASSAT', 'PARATI', 'PARATY', 'SAVEIRO', 'FUSCA', 'KOMBI', 'POLO', 'GOLF', 'VOYAGE', 'UP', 'BORA', 'JETTA'],
    'GM': ['GM', 'CHEVROLET', 'CORSA', 'CELTA', 'ONIX', 'PRISMA', 'ASTRA', 'VECTRA', 'ZAFIRA', 'MONTANA', 'MERIVA', 'AGILE', 'CHEVETTE', 'MONZA', 'SPIN', 'S10', 'CRUZE', 'COBALT', 'TRACKER'],
    'Fiat': ['FIAT', 'PALIO', 'SIENA', 'UNO', 'STRADA', 'PUNTO', 'MOBI', 'ARGO', 'TORO', 'DOBLO', 'TEMPRA', 'LINEA', 'IDEA', 'MAREA', 'FIORINO', 'CRONOS'],
    'Ford': ['FORD', 'FD', 'FIESTA', 'ECOSPORT', 'KA', 'ESCORT', 'CORCEL', 'DEL REY', 'DELREY', 'PAMPA', 'FOCUS', 'COURIER', 'RANGER', 'MONDEO', 'F1000'],
    'Toyota': ['TOYOTA', 'COROLLA', 'ETIOS', 'HILUX', 'YARIS', 'RAV4'],
    'Honda': ['HONDA', 'CIVIC', 'FIT', 'CITY', 'HR-V', 'HRV', 'CR-V', 'CRV', 'ACCORD'],
    'Renault': ['RENAULT', 'CLIO', 'SANDERO', 'LOGAN', 'DUSTER', 'KWID', 'SYMBOL', 'KANGOO', 'KANGO', 'MEGANE', 'SCENIC', 'CAPTUR', 'OROCH', 'MASTER'],
    'Peugeot/Citroën': ['PEUGEOT', 'CITROEN', 'CITROËN', '206', '207', '208', '307', '308', 'C3', 'C4', 'PICASSO', 'AIRCROSS', 'BERLINGO', 'PARTNER'],
    'Hyundai': ['HYUNDAI', 'HB20', 'CRETA', 'TUCSON', 'I30', 'AZERA', 'SANTA FE', 'HR'],
    'Nissan': ['NISSAN', 'KICKS', 'MARCH', 'VERSA', 'FRONTIER', 'TIIDA', 'SENTRA'],
    'Mitsubishi': ['MITSUBISHI', 'L200', 'PAJERO', 'ASX', 'LANCER', 'OUTLANDER']
}

REF_CODE_REGEX = re.compile(
    r'\b('
    r'P-?\d+[A-Z]?'
    r'|LF-?\d+[A-Z]?(?:-[A-Z0-9]+)?'
    r'|LT-?\d+[A-Z]?'
    r'|LTC-?\d+[A-Z]?'
    r'|D[1-6]00\.\s*\d+[A-Z]?'
    r'|JAHU\s+\d+(?:-\d+)?'
    r'|CORCERAMA\s+\d+'
    r'|KIT&CIA\s+\d+'
    r'|EMO-?\d+'
    r'|KPA\d+'
    r'|K-?\d+[A-Z]?'
    r'|T-?\d+'
    r'|AP-?\d+'
    r'|VW\d+'
    r'|FD\d+'
    r'|FT-?\d+'
    r'|GM\d+'
    r'|QC-?\d+'
    r'|QCW-?\d+'
    r'|GMG-?\d+'
    r'|DC-?\d+'
    r'|DV-?\d+'
    r'|ETE\d+'
    r'|IN\d+'
    r'|[0-9]{3}\.[0-9]{3}\.[0-9]{3}(?:-[0-9A-Z]+)?'
    r'|[A-Z0-9]{2,4}[0-9]{4,8}[A-Z0-9]*'
    r')\b',
    re.IGNORECASE
)

GLUED_START_REGEX = re.compile(
    r'^(P-?\d+[A-Z]?|LF-?\d+(?:-[A-Z0-9]+)?|LT-?\d+[A-Z]?|K-?\d+[A-Z]?)([A-Za-zÀ-ÖØ-öø-ÿ].*)$',
    re.IGNORECASE
)

TECH_SPECS_REGEX = re.compile(
    r'(\b\d+(?:[.,]\d+)?\s*(?:MM|CM|POLEGADAS|"|'
    r'|°|X\s*\d+(?:[.,]\d+)?(?:X\d+(?:[.,]\d+)?)?|M\d+X\d+(?:[.,]\d+)?(?:X\d+)?)\b)',
    re.IGNORECASE
)


def parse_caixa_cell(cell_paragraphs: list[str]) -> tuple[str, str]:
    """
    Analisa os parágrafos de uma célula da coluna CAIXA.
    Retorna (boxNumber, internalCode).
    """
    raw_text = "\n".join(p.strip() for p in cell_paragraphs if p.strip()).strip()
    if not raw_text or raw_text.upper() == 'CAIXA':
        return "", ""

    lines = [ln.strip() for ln in raw_text.split('\n') if ln.strip()]

    # Caso padrão de 2 linhas:
    # Linha 1: Caixa (ex: 392, 10309, 1048B, 39, GAVETA)
    # Linha 2: Código interno (ex: MU392, MU10309, LT-2340, 22839, LF1125A)
    box_number = ""
    internal_code = ""

    if len(lines) >= 2:
        box_number = lines[0]
        internal_code = lines[1]
    elif len(lines) == 1:
        line = lines[0]
        # Verificar se tem dois tokens separados por espaço, ex: "121 FT1380", "10491 MU10491", "738 MU 738", "58 AJ7124"
        # Verificar padrão com MU/LT/LF/COR/FT/AJ/GR
        match_code = re.search(r'\b(MU\s*\d+[A-Za-z]*|LT-?\s*\d+[A-Za-z]*|LF-?\s*\d+[A-Za-z]*|COR-?\s*\d+|FT-?\s*\d+|AJ-?\s*\d+|GR-?\s*\d+|\d+GR)\b', line, re.IGNORECASE)
        if match_code:
            code_found = match_code.group(0).replace(" ", "")
            # O que sobrou na linha é a caixa
            rem = line[:match_code.start()] + line[match_code.end():]
            rem = rem.strip()
            box_number = rem if rem else code_found
            internal_code = code_found
        else:
            # Apenas um número ou código de caixa
            box_number = line

    # Limpeza de prefixos na caixa: "Cx.", "Cx ", "Caixa ", etc.
    box_number = re.sub(r'^(?:cx\.?|caixa)\s*', '', box_number, flags=re.IGNORECASE).strip()
    # Remover espaços internos em números como "10 28" -> "1028" quando forem dígitos
    if re.match(r'^\d+\s+\d+$', box_number):
        box_number = box_number.replace(" ", "")

    # Se internal_code tem formato "MU 738" -> "MU738"
    if internal_code:
        internal_code = re.sub(r'\s+', '', internal_code)

    return box_number, internal_code


def parse_description_cell(cell_paragraphs: list[str]) -> dict:
    """
    Analisa os parágrafos da célula de DESCRIÇÃO.
    Extrai códigos grudados, referências, montadoras e medidas técnicas.
    """
    raw_desc = " ".join(p.strip() for p in cell_paragraphs if p.strip()).strip()
    if not raw_desc or raw_desc.upper().startswith('DESCRI'):
        return {
            'rawDescription': '',
            'cleanDescription': '',
            'refCodes': [],
            'carmakers': [],
            'technicalSpecs': []
        }

    clean_text = raw_desc
    ref_codes = []

    # 1. Verificar código grudado no início
    glued_match = GLUED_START_REGEX.match(clean_text)
    if glued_match:
        raw_code, rest = glued_match.groups()
        # Normalizar códigos do tipo P111 para P-111
        if raw_code.upper().startswith('P') and not raw_code.upper().startswith('P-') and raw_code[1:].isdigit():
            normalized_code = f"P-{raw_code[1:]}"
        else:
            normalized_code = raw_code
        ref_codes.append(normalized_code)
        clean_text = rest.strip()

    # 2. Localizar outras referências no texto
    matches = REF_CODE_REGEX.findall(clean_text)
    for m in matches:
        m_clean = m.strip()
        if len(m_clean) >= 2 and m_clean.upper() not in [c.upper() for c in ref_codes]:
            # Evitar adicionar palavras comuns acidentais
            if m_clean.upper() not in ['ITEM', 'CAIXA', 'COM', 'SEM', 'TDS', 'PRETO', 'CINZA', 'AZUL', 'TODOS']:
                ref_codes.append(m_clean)

    # 3. Detectar montadoras
    carmakers = []
    upper_desc = raw_desc.upper()
    for cm, keywords in CARMAKERS_KEYWORDS.items():
        for kw in keywords:
            # Busca de palavra inteira
            if re.search(r'\b' + re.escape(kw) + r'\b', upper_desc):
                if cm not in carmakers:
                    carmakers.append(cm)
                break
    if not carmakers:
        carmakers.append('Universal')

    # 4. Medidas técnicas
    specs = []
    spec_matches = TECH_SPECS_REGEX.findall(raw_desc)
    for sm in spec_matches:
        sm_clean = sm.strip()
        if sm_clean and sm_clean not in specs:
            specs.append(sm_clean)

    return {
        'rawDescription': raw_desc,
        'cleanDescription': clean_text,
        'refCodes': ref_codes,
        'carmakers': carmakers,
        'technicalSpecs': specs
    }


def extract_catalogs():
    os.makedirs(OUTPUT_IMG_DIR, exist_ok=True)
    all_products = []
    stats = {
        'totalItems': 0,
        'totalImages': 0,
        'visualOnlyItems': 0,
        'byDoc': {},
        'byCategory': {}
    }

    item_counter = 1

    for doc_info in DOCX_FILES:
        docx_path = doc_info['path']
        default_cat = doc_info['default_category']
        doc_name = os.path.basename(docx_path)
        stats['byDoc'][doc_name] = {'items': 0, 'images': 0, 'visualOnly': 0}

        print(f"\n=======================================================")
        print(f"LENDO DOCUMENTO: {docx_path}")
        print(f"=======================================================")

        with zipfile.ZipFile(docx_path) as z:
            # Carregar relacionamentos para mapear rId -> word/media/...
            rels_tree = ET.fromstring(z.read('word/_rels/document.xml.rels'))
            rels = {r.attrib.get('Id'): r.attrib.get('Target') for r in rels_tree}

            doc_tree = ET.fromstring(z.read('word/document.xml'))
            body = doc_tree.find('w:body', ns)
            if body is None:
                continue

            current_category = default_cat

            for child in body:
                tag = child.tag.split('}')[-1]

                # Rastrear parágrafos que definem seções / títulos
                if tag == 'p':
                    p_texts = [t.text for t in child.iter(f'{{{W_NS}}}t') if t.text]
                    p_full = " ".join(p_texts).strip()
                    if p_full and len(p_full) > 2:
                        # Verificar se é apenas cabeçalho de coluna
                        is_col_header = p_full.strip().upper() in [
                            'ITEM', 'CAIXA', 'IMAGEM', 'DESCRIÇÃO', 'DESCRIÇAO', 'DESCRIÇO', 'DESCRICAO'
                        ]
                        if not is_col_header:
                            new_cat = normalize_category(p_full, current_category)
                            if new_cat != current_category:
                                current_category = new_cat
                                print(f"  [Seção Detectada] -> {current_category}")

                # Processar tabelas
                elif tag == 'tbl':
                    rows = child.findall('w:tr', ns)
                    for r_idx, row in enumerate(rows):
                        cells = row.findall('w:tc', ns)
                        if len(cells) < 3:
                            continue

                        # A linha é dividida em 2 produtos:
                        # Produto Esquerdo: cols 0, 1, 2
                        # Produto Direito:  cols 3, 4, 5
                        slots = []
                        if len(cells) >= 3:
                            slots.append(('left', cells[0], cells[1], cells[2]))
                        if len(cells) >= 6:
                            slots.append(('right', cells[3], cells[4], cells[5]))

                        for side, img_cell, desc_cell, box_cell in slots:
                            # 1. Extrair imagens do slot
                            img_targets = []
                            for blip in img_cell.iter(f'{{{A_NS}}}blip'):
                                r_id = blip.attrib.get(f'{{{R_NS}}}embed')
                                if r_id and r_id in rels:
                                    img_targets.append(rels[r_id])
                            for v_img in img_cell.iter(f'{{{V_NS}}}imagedata'):
                                r_id = v_img.attrib.get(f'{{{R_NS}}}id')
                                if r_id and r_id in rels:
                                    img_targets.append(rels[r_id])

                            # 2. Extrair textos de descrição e caixa
                            desc_paras = []
                            for p in desc_cell.findall('w:p', ns):
                                txt = "".join(t.text for t in p.iter(f'{{{W_NS}}}t') if t.text).strip()
                                if txt:
                                    desc_paras.append(txt)

                            box_paras = []
                            for p in box_cell.findall('w:p', ns):
                                txt = "".join(t.text for t in p.iter(f'{{{W_NS}}}t') if t.text).strip()
                                if txt:
                                    box_paras.append(txt)

                            desc_joined = " ".join(desc_paras).strip()
                            box_joined = " ".join(box_paras).strip()

                            # Descartar linhas de cabeçalho da tabela
                            if desc_joined.upper().startswith('DESCRI') or box_joined.upper() == 'CAIXA' or desc_joined.upper() == 'ITEM':
                                continue

                            # Descartar slot se for 100% vazio (sem imagem, sem texto, sem caixa)
                            if not img_targets and not desc_joined and not box_joined:
                                continue

                            # Identificador único do item (100% lowercase para o id e imagens)
                            item_id = f"miudeza_{item_counter:04d}"
                            item_counter += 1

                            # Analisar Caixa e Código Interno
                            box_number, internal_code = parse_caixa_cell(box_paras)

                            # Analisar Descrição
                            desc_data = parse_description_cell(desc_paras)

                            # Verificar regra crítica: Item Visual (com foto e caixa, mas sem descrição)
                            needs_review = False
                            final_desc = desc_data['rawDescription']
                            final_clean_desc = desc_data['cleanDescription']

                            if not final_desc:
                                if img_targets or box_number:
                                    needs_review = True
                                    box_display = box_number if box_number else 'A Definir'
                                    if not box_number:
                                        box_number = 'A Definir'
                                    final_desc = f"[Identificação Visual] {current_category} — Caixa {box_display}"
                                    final_clean_desc = final_desc
                                    stats['visualOnlyItems'] += 1
                                    stats['byDoc'][doc_name]['visualOnly'] += 1

                            # Converter imagens para WebP no build-time
                            processed_images = []
                            for idx, rel_path in enumerate(img_targets):
                                # Resolver caminho no ZIP (ex: 'media/image1.png' -> 'word/media/image1.png')
                                zip_img_path = rel_path if rel_path.startswith('word/') else f"word/{rel_path}"
                                if zip_img_path in z.namelist():
                                    raw_img_bytes = z.read(zip_img_path)
                                    suffix = f"_{idx}" if idx > 0 else ""
                                    webp_filename = f"{item_id}{suffix}.webp".lower()
                                    webp_out_path = os.path.join(OUTPUT_IMG_DIR, webp_filename)
                                    conv_res = convert_image_bytes(raw_img_bytes, webp_out_path)
                                    processed_images.append(f"./catalog-images/miudezas/{webp_filename}")
                                    stats['totalImages'] += 1
                                    stats['byDoc'][doc_name]['images'] += 1

                            primary_thumb = processed_images[0] if processed_images else "./catalog-images/placeholder.webp"

                            product_record = {
                                'id': item_id,
                                'sourceDoc': doc_name,
                                'category': current_category,
                                'boxNumber': box_number,
                                'internalCode': internal_code,
                                'refCodes': desc_data['refCodes'],
                                'description': final_desc,
                                'cleanDescription': final_clean_desc,
                                'carmakers': desc_data['carmakers'],
                                'technicalSpecs': desc_data['technicalSpecs'],
                                'images': processed_images,
                                'thumbnail': primary_thumb,
                                'needsDescriptionReview': needs_review,
                                'price': None,
                                'updatedAt': datetime.now().isoformat()
                            }

                            all_products.append(product_record)
                            stats['totalItems'] += 1
                            stats['byDoc'][doc_name]['items'] += 1
                            stats['byCategory'][current_category] = stats['byCategory'].get(current_category, 0) + 1

    # Montar master seed catalog
    master_seed = {
        'catalogVersion': '1.0.0',
        'generatedAt': datetime.now().isoformat(),
        'totalItems': len(all_products),
        'stats': stats,
        'categories': sorted(list(stats['byCategory'].keys())),
        'items': all_products
    }

    os.makedirs(os.path.dirname(OUTPUT_SEED_JSON), exist_ok=True)
    with open(OUTPUT_SEED_JSON, 'w', encoding='utf-8') as f:
        json.dump(master_seed, f, ensure_ascii=False, indent=2)

    print("\n=======================================================")
    print("EXTRAÇÃO CONCLUÍDA COM SUCESSO!")
    print("=======================================================")
    print(f"Total de Produtos Extraídos: {len(all_products)}")
    print(f"Total de Imagens WebP Convertidas: {stats['totalImages']}")
    print(f"Itens Visuais Preservados (Foto+Caixa s/ Descrição): {stats['visualOnlyItems']}")
    print(f"Arquivo Master Seed: {OUTPUT_SEED_JSON} ({os.path.getsize(OUTPUT_SEED_JSON)} bytes)")
    print("\nContagem por Documento:")
    for doc, dstat in stats['byDoc'].items():
        print(f"  • {doc}: {dstat['items']} itens | {dstat['images']} fotos | {dstat['visualOnly']} visuais")
    print("\nContagem por Seção / Categoria:")
    for cat, cnt in sorted(stats['byCategory'].items(), key=lambda x: -x[1]):
        print(f"  • {cat}: {cnt} itens")

    return master_seed


if __name__ == '__main__':
    extract_catalogs()
