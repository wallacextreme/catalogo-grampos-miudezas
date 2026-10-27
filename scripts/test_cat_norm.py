import re
import unicodedata

def clean_key(s):
    nfkd = unicodedata.normalize('NFKD', s)
    ascii_str = ''.join(c for c in nfkd if not unicodedata.combining(c))
    return re.sub(r'[^A-Z0-9]', '', ascii_str.upper())

HEADINGS = [
    "GRAMPOS,PRESILHAS,BATENTES E ACABAMENTOS",
    "PORCA RAPIDA E BUCHAS DE FIXAÇÃO",
    "MOLAS EM GERAL",
    "ALÇAS,MOLDURA E KITS BANCO",
    "PARAFUSO FIXAÇÃO E EGULAGEM DE FAROL",
    "PEÇAS CATALOGO 2",
    "CASTELO VELA(TUCHO)",
    "CALOTA CUBO RODA",
    "PORCAS PONTA EIXO/HOMOCINETICA/AMORTECEDOR",
    "BUJAO E ANEIS DE CARTER E CAIXA",
    "PARAFUSO SUSPENSAO/BALANCA/MOTOR",
    "KIT EMBREAGEM E KITS DE PEDAL",
    "BUCHA CAIXA DIREÇÃO",
    "CONEXÕES",
    "REGULAGEM DE FREIO"
]

RULES = [
    ('GRAMPO', 'Grampos, Presilhas, Batentes e Acabamentos'),
    ('PORCARAPIDA', 'Porca Rápida e Buchas de Fixação'),
    ('MOLA', 'Molas em Geral'),
    ('BANCO', 'Alças, Moldura e Kits Banco'),
    ('FAROL', 'Parafuso Fixação e Regulagem de Farol'),
    ('CASTELO', 'Castelo Vela (Tucho)'),
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

for h in HEADINGS:
    k = clean_key(h)
    matched = None
    for pattern, cat in RULES:
        if pattern in k:
            matched = cat
            break
    print(f"{h} -> {matched}")
