import re

TEST_CASES = [
    "P111PRESILHA PARABARRO/PARACHOQUE LINHA TOYOTA/HONDA",
    "P-194PORCA RAPIDA FIXAÇÃO PARALAMA GOL/PARATI",
    "P-261GRAMPO FORRO PORTA PALIO/SIENA",
    "P-557PRESILHA PAINEL COROLLA",
    "LF0984-BBUCHA DO TRILHO BANCO SANTANA",
    "PINO FIXAÇAO PEDAL EMBREAGEM FIESTA/ ECOSPORT 01/... XS6171586AA",
    "LF0437 REPARO CABO SELEÇAO/ENGATE MARCHAS CELTA /CORSA/PRISMA/ VECTRA 05/ .. SIST. CABO.",
    "D200. 115 REPAROSELEÇAO MARCHAS CELTA /CORSA/AGILE/PUNTO/STRADA SIST. CABO.",
    "PARAFUSO FLANGEADO M20X1,50X43 RODA TRASEIRA",
    "CONEXAO ENGATE RAPIDO 5/16\" x 5/16\" 90° COM TRAVA",
    "BUJÃO CARTER M14X1,50 COM ANEL ALUMINIO",
    "JAHU 08271-9 GRAMPO HASTE CAPO ONIX/PRISMA"
]

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

# Also pattern for glued codes at start, e.g. "P111PRESILHA" -> "P-111", "PRESILHA"
GLUED_START_REGEX = re.compile(r'^(P\d+|P-\d+|LF\d+[A-Z]?|LF-\d+[A-Z]?-?[A-Z0-9]*|LT\d+|LT-\d+|K\d+|K-\d+)([A-Za-zÀ-ÖØ-öø-ÿ].*)$', re.IGNORECASE)

for text in TEST_CASES:
    glued_match = GLUED_START_REGEX.match(text)
    ref_codes = []
    clean_text = text
    if glued_match:
        raw_code, rest = glued_match.groups()
        # normalize P111 -> P-111
        if raw_code.upper().startswith('P') and not raw_code.upper().startswith('P-') and raw_code[1:].isdigit():
            normalized_code = f"P-{raw_code[1:]}"
        else:
            normalized_code = raw_code
        ref_codes.append(normalized_code)
        clean_text = rest.strip()
    
    # find other ref codes in text
    found = REF_CODE_REGEX.findall(clean_text)
    for f in found:
        f_norm = f.strip()
        if f_norm.upper() not in [c.upper() for c in ref_codes]:
            ref_codes.append(f_norm)
    
    print(f"Original: {text}")
    print(f"  Ref Codes: {ref_codes}")
    print(f"  Clean: {clean_text}\n")
