import type { ContentType } from './types';

const LABELS: Record<ContentType, string> = {
  url: 'enlace',
  text: 'texto',
  phone: 'telefono',
  email: 'correo',
  wifi: 'wifi',
  whatsapp: 'whatsapp',
  vcard: 'contacto',
};

/**
 * Genera un nombre de archivo descriptivo y seguro (sin espacios ni acentos)
 * para el QR descargado, por ejemplo "qr-wifi".
 */
export function buildQrFileName(type: ContentType): string {
  return `qr-${LABELS[type]}`;
}
