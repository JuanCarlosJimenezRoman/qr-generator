import { describe, expect, it } from 'vitest';
import { encodeEmail } from './email';

describe('encodeEmail', () => {
  it('genera un mailto: básico sin asunto ni cuerpo', () => {
    expect(encodeEmail({ to: 'hola@ejemplo.com' })).toEqual({ ok: true, value: 'mailto:hola@ejemplo.com' });
  });

  it('incluye asunto y cuerpo codificados como query params', () => {
    const result = encodeEmail({
      to: 'hola@ejemplo.com',
      subject: 'Hola & bienvenido',
      body: 'Línea 1\nLínea 2',
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.startsWith('mailto:hola@ejemplo.com?')).toBe(true);
      const params = new URLSearchParams(result.value.split('?')[1]);
      expect(params.get('subject')).toBe('Hola & bienvenido');
      expect(params.get('body')).toBe('Línea 1\nLínea 2');
    }
  });

  it('rechaza un correo sin @', () => {
    expect(encodeEmail({ to: 'no-es-correo' }).ok).toBe(false);
  });

  it('rechaza un correo vacío', () => {
    expect(encodeEmail({ to: '' }).ok).toBe(false);
  });
});
