import type { QrStyle } from './templates';

// Colores de marca por red social (públicos, tal como cada red los usa en su
// propio branding). SOLO se usan como color/degradado del QR y como acento
// del botón selector — nunca se dibuja el logo/ícono oficial de la red
// dentro del QR exportado, para no insinuar que el QR está afiliado o
// respaldado por esa marca (ver decisión en templates.ts). El emoji de cada
// botón es un ícono genérico de apoyo visual, no el logo de la red.

export interface SocialTemplate {
  id: string;
  label: string;
  icon: string;
  placeholder: string;
  brandColor: string;
  style: QrStyle;
}

export const SOCIAL_TEMPLATES: SocialTemplate[] = [
  {
    id: 'youtube',
    label: 'YouTube',
    icon: '▶️',
    placeholder: 'youtube.com/@usuario',
    brandColor: '#ff0000',
    style: {
      dotsType: 'classy-rounded',
      dotsColor: '#ff0000',
      cornersSquareType: 'square',
      cornersSquareColor: '#282828',
      cornersDotType: 'square',
      cornersDotColor: '#282828',
      backgroundColor: '#ffffff',
    },
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: '📷',
    placeholder: 'instagram.com/usuario',
    brandColor: '#e4405f',
    style: {
      dotsType: 'extra-rounded',
      dotsGradient: {
        type: 'linear',
        rotation: Math.PI / 4,
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
    id: 'tiktok',
    label: 'TikTok',
    icon: '🎵',
    placeholder: 'tiktok.com/@usuario',
    brandColor: '#00f2ea',
    style: {
      dotsType: 'square',
      dotsColor: '#000000',
      cornersSquareType: 'square',
      cornersSquareColor: '#000000',
      cornersDotType: 'square',
      cornersDotColor: '#ff0050',
      backgroundColor: '#ffffff',
    },
  },
  {
    id: 'x',
    label: 'X (Twitter)',
    icon: '✖️',
    placeholder: 'x.com/usuario',
    brandColor: '#000000',
    style: {
      dotsType: 'square',
      dotsColor: '#000000',
      cornersSquareType: 'square',
      cornersSquareColor: '#000000',
      cornersDotType: 'square',
      cornersDotColor: '#000000',
      backgroundColor: '#ffffff',
    },
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: '💼',
    placeholder: 'linkedin.com/in/usuario',
    brandColor: '#0a66c2',
    style: {
      dotsType: 'square',
      dotsColor: '#0a66c2',
      cornersSquareType: 'square',
      cornersSquareColor: '#0a66c2',
      cornersDotType: 'square',
      cornersDotColor: '#0a66c2',
      backgroundColor: '#ffffff',
    },
  },
  {
    id: 'facebook',
    label: 'Facebook',
    icon: '📘',
    placeholder: 'facebook.com/usuario',
    brandColor: '#1877f2',
    style: {
      dotsType: 'rounded',
      dotsColor: '#1877f2',
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#1877f2',
      cornersDotType: 'dot',
      cornersDotColor: '#1877f2',
      backgroundColor: '#ffffff',
    },
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: '🐙',
    placeholder: 'github.com/usuario',
    brandColor: '#181717',
    style: {
      dotsType: 'square',
      dotsColor: '#181717',
      cornersSquareType: 'square',
      cornersSquareColor: '#181717',
      cornersDotType: 'square',
      cornersDotColor: '#181717',
      backgroundColor: '#ffffff',
    },
  },
  {
    id: 'spotify',
    label: 'Spotify',
    icon: '🎧',
    placeholder: 'open.spotify.com/user/usuario',
    brandColor: '#1db954',
    style: {
      dotsType: 'dots',
      dotsColor: '#1db954',
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#191414',
      cornersDotType: 'dot',
      cornersDotColor: '#191414',
      backgroundColor: '#ffffff',
    },
  },
  {
    id: 'twitch',
    label: 'Twitch',
    icon: '🎮',
    placeholder: 'twitch.tv/usuario',
    brandColor: '#9146ff',
    style: {
      dotsType: 'classy-rounded',
      dotsColor: '#9146ff',
      cornersSquareType: 'square',
      cornersSquareColor: '#9146ff',
      cornersDotType: 'square',
      cornersDotColor: '#9146ff',
      backgroundColor: '#ffffff',
    },
  },
  {
    id: 'discord',
    label: 'Discord',
    icon: '💬',
    placeholder: 'discord.gg/invitacion',
    brandColor: '#5865f2',
    style: {
      dotsType: 'rounded',
      dotsColor: '#5865f2',
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#5865f2',
      cornersDotType: 'dot',
      cornersDotColor: '#5865f2',
      backgroundColor: '#ffffff',
    },
  },
];

const HAS_PROTOCOL = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//;

/**
 * Extrae un "handle" de ejemplo a partir de la URL ya escrita por el
 * usuario (último segmento no vacío de la ruta, sin el "@" inicial). Es
 * puramente local: no se hace ninguna petición de red ni se consulta
 * ninguna API o red social — solo se lee lo que el usuario ya escribió.
 */
export function extractHandle(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  const withProtocol = HAS_PROTOCOL.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    const segments = parsed.pathname.split('/').filter(Boolean);
    if (segments.length === 0) return null;
    const last = segments[segments.length - 1];
    return last.replace(/^@/, '') || null;
  } catch {
    return null;
  }
}
