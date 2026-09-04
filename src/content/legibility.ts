export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

/**
 * Reglas de "diseño seguro" para que el QR generado siga siendo legible:
 * contraste suficiente entre color y fondo, y contenido que no genere
 * un código demasiado denso para escanear cómodamente.
 */

export interface ContrastResult {
  ratio: number;
  ok: boolean;
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.trim().replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;
  const value = parseInt(full, 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

// Umbral basado en el mismo criterio que WCAG AA para texto normal (4.5:1).
// No es una norma oficial para QR, pero es un proxy razonable y verificable
// para "el color y el fondo se distinguen claramente".
export const MIN_SAFE_CONTRAST_RATIO = 4.5;

export function checkContrast(foreground: string, background: string): ContrastResult {
  const l1 = relativeLuminance(hexToRgb(foreground));
  const l2 = relativeLuminance(hexToRgb(background));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return { ratio, ok: ratio >= MIN_SAFE_CONTRAST_RATIO };
}

export interface ContentLengthResult {
  bytes: number;
  ok: boolean;
}

// A partir de ~400 bytes el QR empieza a necesitar versiones con muchos
// módulos (ver requisitos.md): sigue siendo válido, pero cada vez más
// difícil de escanear con una cámara de celular a tamaños normales.
export const COMFORTABLE_CONTENT_BYTES = 400;

export function checkContentLength(value: string): ContentLengthResult {
  const bytes = new TextEncoder().encode(value).length;
  return { bytes, ok: bytes <= COMFORTABLE_CONTENT_BYTES };
}
