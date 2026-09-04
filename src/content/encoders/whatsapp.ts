import { type EncodeResult, ok, err } from '../result';

export interface WhatsappInput {
  phone: string;
  message?: string;
}

export function encodeWhatsapp(input: WhatsappInput): EncodeResult {
  const digitsOnly = input.phone.replace(/[^\d]/g, '');

  if (!digitsOnly) {
    return err('El teléfono no puede estar vacío.');
  }

  if (digitsOnly.length < 8) {
    return err('El teléfono debe incluir código de país y ser válido (mínimo 8 dígitos).');
  }

  const url = new URL(`https://wa.me/${digitsOnly}`);
  if (input.message?.trim()) {
    url.searchParams.set('text', input.message.trim());
  }

  return ok(url.toString());
}
