import { describe, expect, it } from 'vitest';
import { countTrackingParams, stripTrackingParams } from './trackingParams';

describe('stripTrackingParams', () => {
  it('quita utm_* y deja el resto de la URL intacta', () => {
    const result = stripTrackingParams(
      'https://ejemplo.com/pagina?utm_source=fb&utm_medium=social&id=42',
    );
    expect(result.url).toBe('https://ejemplo.com/pagina?id=42');
    expect(result.removedCount).toBe(2);
  });

  it('quita fbclid y mibextid, incluso repetidos', () => {
    const result = stripTrackingParams(
      'https://www.facebook.com/profile.php?id=123&mibextid=wwXIfr&mibextid=wwXIfr',
    );
    expect(result.url).toBe('https://www.facebook.com/profile.php?id=123');
    expect(result.removedCount).toBe(2); // dos entradas mibextid en la query original
  });

  it('no cambia una URL sin parámetros de seguimiento', () => {
    const result = stripTrackingParams('https://ejemplo.com/pagina?id=42');
    expect(result.url).toBe('https://ejemplo.com/pagina?id=42');
    expect(result.removedCount).toBe(0);
  });

  it('no cambia una URL sin query string', () => {
    const result = stripTrackingParams('https://ejemplo.com/');
    expect(result.url).toBe('https://ejemplo.com/');
    expect(result.removedCount).toBe(0);
  });

  it('devuelve la entrada sin cambios si no es una URL válida', () => {
    const result = stripTrackingParams('no es una url');
    expect(result).toEqual({ url: 'no es una url', removedCount: 0 });
  });
});

describe('countTrackingParams', () => {
  it('cuenta los parámetros de seguimiento presentes', () => {
    expect(
      countTrackingParams('https://ejemplo.com/?utm_source=x&utm_medium=y&gclid=z&id=1'),
    ).toBe(3);
  });

  it('devuelve 0 cuando no hay parámetros de seguimiento', () => {
    expect(countTrackingParams('https://ejemplo.com/?id=1')).toBe(0);
  });

  it('devuelve 0 para texto que no es una URL', () => {
    expect(countTrackingParams('ejemplo.com')).toBe(0);
  });
});
