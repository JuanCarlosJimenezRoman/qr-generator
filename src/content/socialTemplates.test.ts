import { describe, expect, it } from 'vitest';
import { extractHandle, SOCIAL_TEMPLATES } from './socialTemplates';

describe('SOCIAL_TEMPLATES', () => {
  it('tiene 10 redes, cada una con id único', () => {
    expect(SOCIAL_TEMPLATES).toHaveLength(10);
    const ids = SOCIAL_TEMPLATES.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('cada plantilla tiene label, icono, placeholder y color de marca definidos', () => {
    for (const social of SOCIAL_TEMPLATES) {
      expect(social.label).toBeTruthy();
      expect(social.icon).toBeTruthy();
      expect(social.placeholder).toBeTruthy();
      expect(social.brandColor).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(social.style.backgroundColor).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });
});

describe('extractHandle', () => {
  it('extrae el último segmento de la ruta', () => {
    expect(extractHandle('instagram.com/usuario')).toBe('usuario');
    expect(extractHandle('https://youtube.com/@usuario')).toBe('usuario');
  });

  it('quita el @ inicial si viene incluido', () => {
    expect(extractHandle('tiktok.com/@bailarina')).toBe('bailarina');
  });

  it('devuelve null para una URL vacía', () => {
    expect(extractHandle('')).toBeNull();
    expect(extractHandle('   ')).toBeNull();
  });

  it('devuelve null para una URL sin ninguna ruta', () => {
    expect(extractHandle('instagram.com')).toBeNull();
    expect(extractHandle('https://instagram.com/')).toBeNull();
  });

  it('devuelve null para texto que no es una URL válida', () => {
    expect(extractHandle('esto no es una url')).toBeNull();
  });
});
