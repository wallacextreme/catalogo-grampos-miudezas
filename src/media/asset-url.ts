/**
 * asset-url.ts - Resolução de caminhos de imagens estáticas
 *
 * O app é publicado em subdiretório no GitHub Pages (ex: /catalogo-grampos-miudezas/).
 * Caminhos absolutos como "/catalog-images/..." apontariam para a raiz do domínio
 * (github.io/catalog-images/...) e retornariam 404. Aqui convertemos esses caminhos
 * para relativos ("./catalog-images/..."), que funcionam tanto em localhost quanto
 * em qualquer subdiretório.
 */

import { Product } from '../types';

export const PLACEHOLDER_IMAGE = './catalog-images/placeholder.webp';

export function resolveAssetUrl(url: string | undefined | null): string {
  if (!url) return '';
  // data:, blob:, http(s): e caminhos já relativos permanecem intactos
  if (/^(data:|blob:|https?:|\.\/|\.\.\/)/i.test(url)) return url;
  if (url.startsWith('/catalog-images/')) return '.' + url;
  if (url.startsWith('catalog-images/')) return './' + url;
  return url;
}

/**
 * Retorna uma cópia do produto com todos os caminhos de imagem normalizados.
 * Retorna o MESMO objeto se nada precisou mudar (permite detectar alterações).
 */
export function normalizeProductImages(p: Product): Product {
  const images = Array.isArray(p.images) ? p.images.map((i) => resolveAssetUrl(i)) : [];
  const thumbnail = resolveAssetUrl(p.thumbnail);
  const changed =
    thumbnail !== (p.thumbnail || '') ||
    !Array.isArray(p.images) ||
    images.some((img, idx) => img !== p.images[idx]);
  return changed ? { ...p, images, thumbnail } : p;
}
