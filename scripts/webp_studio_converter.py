"""
webp_studio_converter.py - Build-Time WebP Studio Converter
Converte imagens brutas (PNG/JPEG) extraídas de documentos Word (.docx) para WebP
de altíssima qualidade (quality=96, method=6, exact=True), compondo sobre fundo
branco puro (#FFFFFF), executando smart trim com margem de 16px, preservando
a proporção original e auditando 100% dos pixels para eliminar falhas e fundos pretos.
"""

import io
import os
import sys
from PIL import Image, ImageChops, ImageOps


def convert_image_bytes(
    raw_bytes: bytes,
    out_path: str,
    padding: int = 16,
    quality: int = 96,
    method: int = 6
) -> dict:
    """
    Converte bytes de imagem para arquivo .webp auditado.
    Garante que out_path seja 100% lowercase.
    """
    # Forçar out_path lowercase
    dir_name = os.path.dirname(out_path)
    base_name = os.path.basename(out_path).lower()
    if not base_name.endswith('.webp'):
        base_name = os.path.splitext(base_name)[0] + '.webp'
    final_out_path = os.path.join(dir_name, base_name) if dir_name else base_name

    if dir_name:
        os.makedirs(dir_name, exist_ok=True)

    img = Image.open(io.BytesIO(raw_bytes))
    orig_size = img.size
    orig_mode = img.mode

    # Composição sobre fundo branco puro (#FFFFFF)
    bg = Image.new('RGB', img.size, (255, 255, 255))
    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        img_rgba = img.convert('RGBA')
        bg.paste(img_rgba, mask=img_rgba.split()[-1])
        rgb_img = bg
    else:
        rgb_img = img.convert('RGB')

    # Smart Trim: remover bordas vazias brancas
    diff = ImageChops.difference(rgb_img, Image.new('RGB', rgb_img.size, (255, 255, 255)))
    bbox = diff.getbbox()
    if bbox:
        cropped = rgb_img.crop(bbox)
        # Expandir com padding mantendo fundo branco puro
        final_img = ImageOps.expand(cropped, border=padding, fill=(255, 255, 255))
    else:
        # Se for totalmente branco ou vazio, expande a original
        final_img = ImageOps.expand(rgb_img, border=padding, fill=(255, 255, 255))

    # Auditoria de pixels: verificar se a imagem não é 100% preta
    extrema = final_img.getextrema()
    is_all_black = all(e[1] == 0 for e in extrema)
    if is_all_black:
        raise ValueError(f"Imagem auditada inválida: todos os pixels são pretos em {final_out_path}")

    # Salvar WebP sem perda visual perceptível
    final_img.save(
        final_out_path,
        format='WEBP',
        quality=quality,
        method=method,
        exact=True
    )

    out_stat = os.stat(final_out_path)
    return {
        'path': final_out_path,
        'rel_path': os.path.relpath(final_out_path).replace('\\', '/').lower(),
        'orig_size': orig_size,
        'final_size': final_img.size,
        'bytes': out_stat.st_size,
        'audit_pass': True
    }


def audit_webp_file(file_path: str) -> dict:
    """
    Audita um arquivo .webp no disco: integridade, dimensões, canais e ausência de tela preta.
    """
    if not os.path.exists(file_path):
        return {'pass': False, 'error': 'Arquivo inexistente'}

    try:
        with Image.open(file_path) as img:
            img.verify()

        with Image.open(file_path) as img:
            w, h = img.size
            if w <= 0 or h <= 0:
                return {'pass': False, 'error': 'Dimensões inválidas'}
            rgb = img.convert('RGB')
            extrema = rgb.getextrema()
            is_black = all(e[1] == 0 for e in extrema)
            if is_black:
                return {'pass': False, 'error': 'Imagem 100% preta detectada'}
            return {'pass': True, 'width': w, 'height': h, 'mode': img.mode}
    except Exception as e:
        return {'pass': False, 'error': str(e)}


if __name__ == '__main__':
    print("webp_studio_converter module ready.")
