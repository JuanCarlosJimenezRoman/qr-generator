import type { CornerDotType, CornerSquareType, DotType, Gradient } from 'qr-code-styling';
import { SOCIAL_TEMPLATES } from './socialTemplates';

// Plantillas de estilo "genéricas": colores y formas inspiradas en el look de
// apps conocidas, pero SIN usar sus logos ni íconos oficiales (esta es una
// herramienta de terceros, no queremos insinuar afiliación con esas marcas).
// Si el usuario quiere su propio ícono, puede subirlo con la opción de logo,
// que funciona igual sobre cualquier plantilla.

export interface QrStyle {
  dotsType: DotType;
  dotsColor?: string;
  dotsGradient?: Gradient;
  cornersSquareType: CornerSquareType;
  cornersSquareColor?: string;
  cornersDotType: CornerDotType;
  cornersDotColor?: string;
  backgroundColor: string;
}

export interface QrTemplate {
  id: string;
  label: string;
  description: string;
  style: QrStyle;
}

export const CUSTOM_TEMPLATE_ID = 'custom';

const DIAGONAL = Math.PI / 4;

const GENERIC_TEMPLATES: QrTemplate[] = [
  {
    id: 'classic',
    label: 'Clásico',
    description: 'Cuadros negros sobre blanco, el estilo QR de siempre.',
    style: {
      dotsType: 'square',
      dotsColor: '#111111',
      cornersSquareType: 'square',
      cornersSquareColor: '#111111',
      cornersDotType: 'square',
      cornersDotColor: '#111111',
      backgroundColor: '#ffffff',
    },
  },
  {
    id: 'social-warm',
    label: 'Redes (cálido)',
    description: 'Degradado amarillo-rosa-morado con puntos redondeados.',
    style: {
      dotsType: 'extra-rounded',
      dotsGradient: {
        type: 'linear',
        rotation: DIAGONAL,
        colorStops: [
          { offset: 0, color: '#f9ce34' },
          { offset: 0.5, color: '#ee2a7b' },
          { offset: 1, color: '#6228d7' },
        ],
      },
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#6228d7',
      cornersDotType: 'dot',
      cornersDotColor: '#ee2a7b',
      backgroundColor: '#ffffff',
    },
  },
  {
    id: 'social-cool',
    label: 'Redes (frío)',
    description: 'Degradado azul con puntos redondeados.',
    style: {
      dotsType: 'rounded',
      dotsGradient: {
        type: 'linear',
        rotation: DIAGONAL,
        colorStops: [
          { offset: 0, color: '#00c6ff' },
          { offset: 1, color: '#0072ff' },
        ],
      },
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#0072ff',
      cornersDotType: 'dot',
      cornersDotColor: '#00c6ff',
      backgroundColor: '#ffffff',
    },
  },
  {
    id: 'messaging-green',
    label: 'Mensajería (verde)',
    description: 'Verde sólido con puntos tipo burbuja, para contactos y chats.',
    style: {
      dotsType: 'dots',
      dotsColor: '#25d366',
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#128c7e',
      cornersDotType: 'dot',
      cornersDotColor: '#128c7e',
      backgroundColor: '#ffffff',
    },
  },
  {
    id: 'elegant-dark',
    label: 'Elegante (oscuro)',
    description: 'Negro con puntos suaves y fondo claro, para imprimir o enmarcar.',
    style: {
      dotsType: 'classy-rounded',
      dotsColor: '#1a1a1f',
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#1a1a1f',
      cornersDotType: 'dot',
      cornersDotColor: '#1a1a1f',
      backgroundColor: '#f7f7f9',
    },
  },
];

// Las plantillas de redes sociales viven en su propio archivo
// (socialTemplates.ts) y se unifican aquí para que TemplateSelector y
// resolveQrStyle funcionen igual sin importar si la plantilla es genérica
// o de una red social específica.
const SOCIAL_QR_TEMPLATES: QrTemplate[] = SOCIAL_TEMPLATES.map((social) => ({
  id: social.id,
  label: social.label,
  description: `Colores de ${social.label} (no afiliado).`,
  style: social.style,
}));

export const QR_TEMPLATES: QrTemplate[] = [...GENERIC_TEMPLATES, ...SOCIAL_QR_TEMPLATES];

/**
 * Resuelve el estilo final a partir de un id de plantilla. Si el id es
 * "custom" o no coincide con ninguna plantilla, arma un estilo plano a
 * partir de los colores elegidos manualmente (comportamiento clásico).
 */
export function resolveQrStyle(
  templateId: string,
  custom: { dotColor: string; backgroundColor: string },
): QrStyle {
  const template = QR_TEMPLATES.find((t) => t.id === templateId);

  if (!template) {
    return {
      dotsType: 'square',
      dotsColor: custom.dotColor,
      cornersSquareType: 'square',
      cornersSquareColor: custom.dotColor,
      cornersDotType: 'square',
      cornersDotColor: custom.dotColor,
      backgroundColor: custom.backgroundColor,
    };
  }

  return template.style;
}

/**
 * Color representativo del QR para el chequeo de contraste: el color plano
 * si lo hay, o el primer color del degradado.
 */
export function primaryDotColor(style: QrStyle): string {
  if (style.dotsColor) return style.dotsColor;
  if (style.dotsGradient?.colorStops.length) return style.dotsGradient.colorStops[0].color;
  return '#000000';
}
