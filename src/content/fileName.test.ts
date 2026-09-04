import { describe, expect, it } from 'vitest';
import { buildQrFileName } from './fileName';
import type { ContentType } from './types';

describe('buildQrFileName', () => {
  it('genera un nombre descriptivo por cada tipo de contenido', () => {
    const cases: [ContentType, string][] = [
      ['url', 'qr-enlace'],
      ['text', 'qr-texto'],
      ['phone', 'qr-telefono'],
      ['email', 'qr-correo'],
      ['wifi', 'qr-wifi'],
      ['whatsapp', 'qr-whatsapp'],
    ];

    for (const [type, expected] of cases) {
      expect(buildQrFileName(type)).toBe(expected);
    }
  });

  it('no contiene espacios ni caracteres fuera de a-z0-9-', () => {
    const types: ContentType[] = ['url', 'text', 'phone', 'email', 'wifi', 'whatsapp'];
    for (const type of types) {
      expect(buildQrFileName(type)).toMatch(/^[a-z0-9-]+$/);
    }
  });
});
