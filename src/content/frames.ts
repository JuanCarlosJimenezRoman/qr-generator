// src/content/frames.ts

export interface FrameTemplate {
  id: string;
  name: string;
  category: 'standard' | 'community' | 'events' | 'shopping';
  svgPath: string; // Ruta al archivo SVG
  defaultText?: string;
  defaultTextColor?: string;
  defaultMarkColor?: string;
  defaultBackgroundColor?: string;
  isCustomizable: boolean; // Si permite cambiar colores
}

export const FRAME_CATEGORIES = {
  standard: { label: 'Estándar', icon: '📐' },
  community: { label: 'Comunidad', icon: '👥' },
  events: { label: 'Eventos', icon: '🎪' },
  shopping: { label: 'Compras', icon: '🛍️' },
};

export const FRAME_TEMPLATES: FrameTemplate[] = [
  // Estándar
  {
    id: 'frame-minimal',
    name: 'Minimalista',
    category: 'standard',
    svgPath: '/frames/standard/minimal.svg',
    defaultText: 'SCAN ME',
    defaultTextColor: '#ffffff',
    defaultMarkColor: '#000000',
    defaultBackgroundColor: '#ffffff',
    isCustomizable: true,
  },
  {
    id: 'frame-rounded',
    name: 'Esquinas Redondeadas',
    category: 'standard',
    svgPath: '/frames/standard/rounded.svg',
    defaultText: 'SCAN ME',
    defaultTextColor: '#ffffff',
    defaultMarkColor: '#000000',
    defaultBackgroundColor: '#ffffff',
    isCustomizable: true,
  },
  // Comunidad
  {
    id: 'frame-community-1',
    name: 'Comunidad Azul',
    category: 'community',
    svgPath: '/frames/community/community-1.svg',
    defaultText: 'SCAN ME',
    defaultTextColor: '#ffffff',
    defaultMarkColor: '#1a73e8',
    defaultBackgroundColor: '#e8f0fe',
    isCustomizable: true,
  },
  // ... más marcos
];