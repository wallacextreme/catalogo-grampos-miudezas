import { describe, it, expect } from 'bun:test';
import { normalizeSearchTerm, cleanCodeToken } from '../src/search/engine';
import { computeSHA256 } from '../src/media/webp-converter';

describe('Gate 9: Segurança Anti-XSS, Integridade SHA-256 e Disaster Recovery', () => {
  it('deve sanitizar inputs com scripts maliciosos Anti-XSS na busca', () => {
    const maliciousQuery = '<script>alert("XSS")</script> 940';
    const normalized = normalizeSearchTerm(maliciousQuery);
    expect(normalized).not.toContain('<script>');
    expect(normalized).not.toContain('</script>');
    expect(normalized).toBe('script alert xss script 940');

    const cleanToken = cleanCodeToken(maliciousQuery);
    expect(cleanToken).not.toContain('<');
    expect(cleanToken).not.toContain('>');
  });

  it('deve gerar e verificar hashes SHA-256 idênticos para os mesmos dados de backup', async () => {
    const backupData = JSON.stringify({
      backupVersion: '1.0.0',
      totalItems: 915,
      timestamp: '2026-10-27T10:00:00.000Z'
    });

    const encoder = new TextEncoder();
    const hash1 = await computeSHA256(encoder.encode(backupData));
    const hash2 = await computeSHA256(encoder.encode(backupData));

    expect(hash1).toBe(hash2);
    expect(hash1.length).toBe(64); // 256 bits = 64 hex chars
    expect(/^[a-f0-9]{64}$/.test(hash1)).toBe(true);

    // Se houver alteração de 1 byte, o hash deve mudar completamente (Avalanche effect)
    const alteredData = backupData.replace('915', '916');
    const hashAltered = await computeSHA256(encoder.encode(alteredData));
    expect(hashAltered).not.toBe(hash1);
  });
});
