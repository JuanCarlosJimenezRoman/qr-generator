import { describe, expect, it } from 'vitest';
import {
  checkContentLength,
  checkContrast,
  COMFORTABLE_CONTENT_BYTES,
  MIN_SAFE_CONTRAST_RATIO,
} from './legibility';

describe('checkContrast', () => {
  it('da el contraste maximo (21:1) para negro sobre blanco', () => {
    const result = checkContrast('#000000', '#ffffff');
    expect(result.ratio).toBeCloseTo(21, 1);
    expect(result.ok).toBe(true);
  });

  it('acepta la notacion hex corta (#fff)', () => {
    const result = checkContrast('#000', '#fff');
    expect(result.ratio).toBeCloseTo(21, 1);
  });

  it('es simetrico: el orden de los colores no importa', () => {
    const a = checkContrast('#222222', '#dddddd');
    const b = checkContrast('#dddddd', '#222222');
    expect(a.ratio).toBeCloseTo(b.ratio, 5);
  });

  it('marca como no valido un contraste bajo (grises similares)', () => {
    const result = checkContrast('#999999', '#aaaaaa');
    expect(result.ratio).toBeLessThan(MIN_SAFE_CONTRAST_RATIO);
    expect(result.ok).toBe(false);
  });

  it('marca como valido un contraste por encima del umbral', () => {
    const result = checkContrast('#000000', '#dddddd');
    expect(result.ratio).toBeGreaterThanOrEqual(MIN_SAFE_CONTRAST_RATIO);
    expect(result.ok).toBe(true);
  });
});

describe('checkContentLength', () => {
  it('acepta contenido corto', () => {
    const result = checkContentLength('https://ejemplo.com/');
    expect(result.ok).toBe(true);
  });

  it('acepta contenido justo en el limite comodo', () => {
    const result = checkContentLength('a'.repeat(COMFORTABLE_CONTENT_BYTES));
    expect(result.bytes).toBe(COMFORTABLE_CONTENT_BYTES);
    expect(result.ok).toBe(true);
  });

  it('marca como no comodo el contenido que excede el limite', () => {
    const result = checkContentLength('a'.repeat(COMFORTABLE_CONTENT_BYTES + 1));
    expect(result.ok).toBe(false);
  });

  it('cuenta bytes UTF-8, no caracteres (los acentos ocupan mas de 1 byte)', () => {
    const result = checkContentLength('ñ');
    expect(result.bytes).toBe(2);
  });
});
