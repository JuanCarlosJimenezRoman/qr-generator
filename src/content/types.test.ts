import { describe, expect, it } from 'vitest';
import { encodeContent } from './types';

describe('encodeContent', () => {
  it('despacha al codificador correcto según el tipo', () => {
    expect(encodeContent({ type: 'url', data: { url: 'ejemplo.com' } })).toEqual({
      ok: true,
      value: 'https://ejemplo.com/',
    });
  });

  it('propaga los errores de validación del codificador correspondiente', () => {
    const result = encodeContent({
      type: 'wifi',
      data: { ssid: '', password: 'x', security: 'WPA' },
    });
    expect(result.ok).toBe(false);
  });
});
