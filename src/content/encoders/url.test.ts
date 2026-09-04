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

  it('conserva parámetros de query no relacionados con seguimiento cuando cleanTracking es true', () => {
    const result = encodeUrl({ url: 'ejemplo.com/pagina?id=42', cleanTracking: true });
    expect(result).toEqual({ ok: true, value: 'https://ejemplo.com/pagina?id=42' });
  });

  it('quita parámetros de seguimiento (utm, fbclid, mibextid) cuando cleanTracking es true', () => {
    const result = encodeUrl({
      url: 'https://www.facebook.com/profile.php?id=61586114027952&mibextid=wwXIfr&mibextid=wwXIfr',
      cleanTracking: true,
    });
    expect(result).toEqual({
      ok: true,
      value: 'https://www.facebook.com/profile.php?id=61586114027952',
    });
  });

  it('no quita parámetros de seguimiento si cleanTracking no está activado', () => {
    const result = encodeUrl({ url: 'https://ejemplo.com/?utm_source=x' });
    expect(result).toEqual({ ok: true, value: 'https://ejemplo.com/?utm_source=x' });
  });
});
