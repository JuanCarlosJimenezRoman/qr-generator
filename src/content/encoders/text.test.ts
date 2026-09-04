import { describe, expect, it } from 'vitest';
import { encodeText } from './text';

describe('encodeText', () => {
  it('conserva el texto recortando espacios', () => {
    expect(encodeText({ text: '  Hola mundo  ' })).toEqual({ ok: true, value: 'Hola mundo' });
  });

  it('rechaza texto vacío', () => {
    expect(encodeText({ text: '   ' }).ok).toBe(false);
  });

  it('acepta texto justo en el límite de 2000 caracteres', () => {
    expect(encodeText({ text: 'a'.repeat(2000) }).ok).toBe(true);
  });

  it('rechaza texto que excede el máximo permitido', () => {
    expect(encodeText({ text: 'a'.repeat(2001) }).ok).toBe(false);
  });
});
