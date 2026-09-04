import { describe, expect, it } from 'vitest';
import { encodeVCard } from './vcard';

describe('encodeVCard', () => {
  it('genera un vCard 3.0 mínimo solo con el nombre', () => {
    const result = encodeVCard({ fullName: 'Ana Pérez' });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe(
        ['BEGIN:VCARD', 'VERSION:3.0', 'FN:Ana Pérez', 'N:Ana Pérez;;;;', 'END:VCARD'].join('\r\n'),
      );
    }
  });

  it('incluye organización, cargo, teléfono, correo y sitio web cuando vienen', () => {
    const result = encodeVCard({
      fullName: 'Ana Pérez',
      organization: 'Acme',
      title: 'Diseñadora',
      phone: '+52 55 1234 5678',
      email: 'ana@ejemplo.com',
      url: 'ejemplo.com',
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toContain('ORG:Acme');
      expect(result.value).toContain('TITLE:Diseñadora');
      expect(result.value).toContain('TEL;TYPE=CELL:+525512345678');
      expect(result.value).toContain('EMAIL:ana@ejemplo.com');
      expect(result.value).toContain('URL:https://ejemplo.com/');
    }
  });

  it('rechaza un nombre vacío', () => {
    expect(encodeVCard({ fullName: '   ' }).ok).toBe(false);
  });

  it('rechaza un correo inválido', () => {
    expect(encodeVCard({ fullName: 'Ana', email: 'no-es-correo' }).ok).toBe(false);
  });

  it('rechaza un teléfono con letras', () => {
    expect(encodeVCard({ fullName: 'Ana', phone: '55-ABCD-123' }).ok).toBe(false);
  });

  it('rechaza un sitio web inválido', () => {
    expect(encodeVCard({ fullName: 'Ana', url: 'no es una url' }).ok).toBe(false);
  });

  it('escapa punto y coma, coma y backslash en los campos de texto', () => {
    const result = encodeVCard({ fullName: 'Empresa; S.A., S.A.\\', organization: 'A;B,C\\D' });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toContain('FN:Empresa\\; S.A.\\, S.A.\\\\');
      expect(result.value).toContain('ORG:A\\;B\\,C\\\\D');
    }
  });
});
