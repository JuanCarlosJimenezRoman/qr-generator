import { describe, expect, it } from 'vitest';
import { encodePhone } from './phone';

describe('encodePhone', () => {
  it('genera un enlace tel: con formato internacional', () => {
    expect(encodePhone({ phone: '+52 55 1234 5678' })).toEqual({ ok: true, value: 'tel:+525512345678' });
  });

  it('acepta números con paréntesis y guiones', () => {
    const result = encodePhone({ phone: '(55) 1234-5678' });
    expect(result).toEqual({ ok: true, value: 'tel:5512345678' });
  });

  it('rechaza teléfonos vacíos', () => {
    expect(encodePhone({ phone: '' }).ok).toBe(false);
  });

  it('rechaza caracteres inválidos como letras', () => {
    expect(encodePhone({ phone: '55-ABCD-123' }).ok).toBe(false);
  });

  it('rechaza números demasiado cortos', () => {
    expect(encodePhone({ phone: '123' }).ok).toBe(false);
  });
});
