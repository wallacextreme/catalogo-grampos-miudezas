/**
 * webp-converter.ts - Client-Side WebP Converter
 * Converte imagens coladas com Ctrl+V ou arrastadas no balcão
 * para WebP de alta qualidade (quality: 0.96) e miniatura (quality: 0.90)
 * compondo sobre fundo branco puro (#FFFFFF) com hash SHA-256.
 */

import { ConvertedWebPResult } from '../types';

export async function computeSHA256(data: BufferSource): Promise<string> {
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function convertBlobToWebP(
  blob: Blob,
  quality = 0.96,
  maxDimension = 1200
): Promise<ConvertedWebPResult> {
  const imgBitmap = await createImageBitmap(blob);
  let { width, height } = imgBitmap;

  // Manter proporção se exceder dimensão máxima
  if (width > maxDimension || height > maxDimension) {
    if (width > height) {
      height = Math.round((height * maxDimension) / width);
      width = maxDimension;
    } else {
      width = Math.round((width * maxDimension) / height);
      height = maxDimension;
    }
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Falha ao obter contexto 2D do Canvas');
  }

  // Fundo branco puro (#FFFFFF)
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Desenhar imagem
  ctx.drawImage(imgBitmap, 0, 0, width, height);

  // Converter para WebP
  const webpBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error('Falha na conversão para WebP'));
      },
      'image/webp',
      quality
    );
  });

  const arrayBuffer = await webpBlob.arrayBuffer();
  const sha256 = await computeSHA256(arrayBuffer);
  const dataUrl = await blobToDataURL(webpBlob);

  return {
    webpBlob,
    dataUrl,
    sha256,
    width,
    height
  };
}

export async function createThumbnailWebP(
  blob: Blob,
  quality = 0.90,
  maxDimension = 320
): Promise<string> {
  const res = await convertBlobToWebP(blob, quality, maxDimension);
  return res.dataUrl;
}
