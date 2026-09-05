// src/content/patterns.ts

export interface DotPattern {
  id: string;
  name: string;
  type: 'square' | 'rounded' | 'circle' | 'diamond' | 'star' | 'custom';
  svgPath?: string; // Para formas personalizadas
  previewColor: string;
}

export const DOT_PATTERNS: DotPattern[] = [
  { id: 'square', name: 'Cuadrado', type: 'square', previewColor: '#000000' },
  { id: 'rounded', name: 'Redondeado', type: 'rounded', previewColor: '#000000' },
  { id: 'circle', name: 'Círculo', type: 'circle', previewColor: '#000000' },
  { id: 'diamond', name: 'Rombo', type: 'diamond', previewColor: '#000000' },
  { id: 'star', name: 'Estrella', type: 'star', previewColor: '#000000' },
];

export interface CornerPattern {
  id: string;
  name: string;
  squareColor: string;
  dotColor: string;
}

export const CORNER_PATTERNS: CornerPattern[] = [
  { id: 'default', name: 'Estándar', squareColor: '#000000', dotColor: '#000000' },
  { id: 'contrast', name: 'Contraste', squareColor: '#000000', dotColor: '#ffffff' },
  { id: 'colorful', name: 'Colorido', squareColor: '#2563eb', dotColor: '#7c3aed' },
];