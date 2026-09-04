import { type EncodeResult, ok, err } from '../result';

export interface VCardInput {
  fullName: string;
  phone?: string;
  email?: string;
  organization?: string;
  title?: string;
  url?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9()\-.\s]{5,20}$/;
const HAS_PROTOCOL = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//;

// Caracteres que el formato vCard (RFC 6350) requiere escapar con backslash.
const ESCAPE_PATTERN = /([\\;,])/g;

function escapeVCardField(value: string): string {
  return value.replace(ESCAPE_PATTERN, '\\$1').replace(/\r?\n/g, '\\n');
}

function normalizeUrl(raw: string): string | null {
  const withProtocol = HAS_PROTOCOL.test(raw) ? raw : `https://${raw}`;
  try {
    const parsed = new URL(withProtocol);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

/**
 * Codifica una tarjeta de contacto como vCard 3.0. Solo el nombre es
 * obligatorio; el resto de los campos se incluyen si vienen y son válidos.
 */
export function encodeVCard(input: VCardInput): EncodeResult {
  const fullName = input.fullName.trim();
  if (!fullName) {
    return err('El nombre no puede estar vacío.');
  }

  const phone = input.phone?.trim();
  if (phone && !PHONE_PATTERN.test(phone)) {
    return err('El teléfono contiene caracteres no válidos.');
  }

  const email = input.email?.trim();
  if (email && !EMAIL_PATTERN.test(email)) {
    return err('El correo no es válido.');
  }

  let url: string | null = null;
  const rawUrl = input.url?.trim();
  if (rawUrl) {
    url = normalizeUrl(rawUrl);
    if (!url) {
      return err('El sitio web no es válido.');
    }
  }

  const lines = ['BEGIN:VCARD', 'VERSION:3.0'];
  lines.push(`FN:${escapeVCardField(fullName)}`);
  lines.push(`N:${escapeVCardField(fullName)};;;;`);

  const organization = input.organization?.trim();
  if (organization) lines.push(`ORG:${escapeVCardField(organization)}`);

  const title = input.title?.trim();
  if (title) lines.push(`TITLE:${escapeVCardField(title)}`);

  if (phone) {
    const digitsOnly = phone.replace(/[^\d+]/g, '');
    lines.push(`TEL;TYPE=CELL:${digitsOnly}`);
  }

  if (email) lines.push(`EMAIL:${escapeVCardField(email)}`);
  if (url) lines.push(`URL:${escapeVCardField(url)}`);

  lines.push('END:VCARD');

  return ok(lines.join('\r\n'));
}
