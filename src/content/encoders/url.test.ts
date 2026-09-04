import { describe, expect, it } from 'vitest';
import { encodeUrl } from './url';

describe('encodeUrl', () => {
  it('agrega https:// cuando falta el protocolo', () => {
    expect(encodeUrl({ url: 'ejemplo.com' })).toEqual({ ok: true, value: 'https://ejemplo.com/' });
  });

  it('conserva un protocolo http:// explícito', () => {
    const result = encodeUrl({ url: 'http://ejemplo.com' });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe('http://ejemplo.com/');
  });

  it('conserva ruta y query string', () => {
    const result = encodeUrl({ url: 'https://ejemplo.com/ruta?x=1' });
    expect(result).toEqual({ ok: true, value: 'https://ejemplo.com/ruta?x=1' });
  });

  it('rechaza una URL vacía', () => {
    expect(encodeUrl({ url: '   ' }).ok).toBe(false);
  });

  it('rechaza protocolos no http(s), como javascript:', () => {
    expect(encodeUrl({ url: 'javascript://alert(1)' }).ok).toBe(false);
  });

  it('rechaza texto que no es una URL válida', () => {
    expect(encodeUrl({ url: 'no es una url' }).ok).toBe(false);
  });
});
