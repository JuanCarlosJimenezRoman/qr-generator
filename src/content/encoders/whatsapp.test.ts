import { describe, expect, it } from 'vitest';
import { encodeWhatsapp } from './whatsapp';

describe('encodeWhatsapp', () => {
  it('genera un enlace wa.me con el teléfono limpio (sin +, espacios)', () => {
    expect(encodeWhatsapp({ phone: '+52 55 1234 5678' })).toEqual({
      ok: true,
      value: 'https://wa.me/525512345678',
    });
  });

  it('incluye el mensaje como parámetro text, recuperable al decodificar', () => {
    const result = encodeWhatsapp({ phone: '+525512345678', message: 'Hola, ¿cómo estás?' });
    expect(result.ok).toBe(true);
    if (result.ok) {
      const url = new URL(result.value);
      expect(url.origin + url.pathname).toBe('https://wa.me/525512345678');
      expect(url.searchParams.get('text')).toBe('Hola, ¿cómo estás?');
    }
  });

  it('rechaza teléfonos vacíos', () => {
    expect(encodeWhatsapp({ phone: '' }).ok).toBe(false);
  });

  it('rechaza teléfonos demasiado cortos', () => {
    expect(encodeWhatsapp({ phone: '1234' }).ok).toBe(false);
  });
});
