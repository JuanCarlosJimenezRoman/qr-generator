import { describe, expect, it } from 'vitest';
import { CUSTOM_TEMPLATE_ID, primaryDotColor, QR_TEMPLATES, resolveQrStyle } from './templates';

describe('resolveQrStyle', () => {
  it('arma un estilo plano a partir de los colores personalizados cuando el id es "custom"', () => {
    const style = resolveQrStyle(CUSTOM_TEMPLATE_ID, { dotColor: '#ff0000', backgroundColor: '#00ff00' });
    expect(style).toEqual({
      dotsType: 'square',
      dotsColor: '#ff0000',
      cornersSquareType: 'square',
      cornersSquareColor: '#ff0000',
      cornersDotType: 'square',
      cornersDotColor: '#ff0000',
      backgroundColor: '#00ff00',
    });
  });

  it('devuelve el estilo de la plantilla cuando el id coincide', () => {
    const style = resolveQrStyle('classic', { dotColor: '#ff0000', backgroundColor: '#00ff00' });
    expect(style).toEqual(QR_TEMPLATES.find((t) => t.id === 'classic')?.style);
  });

  it('cae de vuelta al estilo personalizado si el id no coincide con ninguna plantilla', () => {
    const style = resolveQrStyle('no-existe', { dotColor: '#123456', backgroundColor: '#abcdef' });
    expect(style.dotsColor).toBe('#123456');
    expect(style.backgroundColor).toBe('#abcdef');
  });

  it('todas las plantillas predefinidas tienen id único y color de fondo definido', () => {
    const ids = QR_TEMPLATES.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const template of QR_TEMPLATES) {
      expect(template.style.backgroundColor).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });
});

describe('primaryDotColor', () => {
  it('devuelve el color plano si existe', () => {
    expect(primaryDotColor({ dotsType: 'square', dotsColor: '#123456', cornersSquareType: 'square', cornersDotType: 'square', backgroundColor: '#fff' })).toBe('#123456');
  });

  it('devuelve el primer color del degradado si no hay color plano', () => {
    const style = {
      dotsType: 'rounded' as const,
      dotsGradient: {
        type: 'linear' as const,
        colorStops: [
          { offset: 0, color: '#aaaaaa' },
          { offset: 1, color: '#bbbbbb' },
        ],
      },
      cornersSquareType: 'square' as const,
      cornersDotType: 'square' as const,
      backgroundColor: '#fff',
    };
    expect(primaryDotColor(style)).toBe('#aaaaaa');
  });

  it('devuelve negro por defecto si no hay ni color ni degradado', () => {
    expect(
      primaryDotColor({ dotsType: 'square', cornersSquareType: 'square', cornersDotType: 'square', backgroundColor: '#fff' }),
    ).toBe('#000000');
  });
});
