import type { EncodeResult } from './result';
import { encodeUrl, type UrlInput } from './encoders/url';
import { encodeText, type TextInput } from './encoders/text';
import { encodePhone, type PhoneInput } from './encoders/phone';
import { encodeEmail, type EmailInput } from './encoders/email';
import { encodeWifi, type WifiInput } from './encoders/wifi';
import { encodeWhatsapp, type WhatsappInput } from './encoders/whatsapp';
import { encodeVCard, type VCardInput } from './encoders/vcard';

export type ContentType = 'url' | 'text' | 'phone' | 'email' | 'wifi' | 'whatsapp' | 'vcard';

// Nombre legible por tipo de contenido, usado en la UI y en el PDF exportado.
export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  url: 'Enlace',
  text: 'Texto',
  phone: 'Teléfono',
  email: 'Correo',
  wifi: 'WiFi',
  whatsapp: 'WhatsApp',
  vcard: 'Contacto',
};

export type ContentInput =
  | { type: 'url'; data: UrlInput }
  | { type: 'text'; data: TextInput }
  | { type: 'phone'; data: PhoneInput }
  | { type: 'email'; data: EmailInput }
  | { type: 'wifi'; data: WifiInput }
  | { type: 'whatsapp'; data: WhatsappInput }
  | { type: 'vcard'; data: VCardInput };

export function encodeContent(input: ContentInput): EncodeResult {
  switch (input.type) {
    case 'url':
      return encodeUrl(input.data);
    case 'text':
      return encodeText(input.data);
    case 'phone':
      return encodePhone(input.data);
    case 'email':
      return encodeEmail(input.data);
    case 'wifi':
      return encodeWifi(input.data);
    case 'whatsapp':
      return encodeWhatsapp(input.data);
    case 'vcard':
      return encodeVCard(input.data);
  }
}
