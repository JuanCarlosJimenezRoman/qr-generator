import { type EncodeResult, ok, err } from '../result';

export interface EmailInput {
  to: string;
  subject?: string;
  body?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function encodeEmail(input: EmailInput): EncodeResult {
  const to = input.to.trim();

  if (!to) {
    return err('El correo del destinatario no puede estar vacío.');
  }

  if (!EMAIL_PATTERN.test(to)) {
    return err('El correo del destinatario no es válido.');
  }

  const params = new URLSearchParams();
  if (input.subject?.trim()) params.set('subject', input.subject.trim());
  if (input.body?.trim()) params.set('body', input.body.trim());

  const query = params.toString();
  return ok(`mailto:${to}${query ? `?${query}` : ''}`);
}
