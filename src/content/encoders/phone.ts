import { type EncodeResult, ok, err } from '../result';

export interface PhoneInput {
  phone: string;
}

const PHONE_PATTERN = /^\+?[0-9()\-.\s]{5,20}$/;

export function encodePhone(input: PhoneInput): EncodeResult {
  const raw = input.phone.trim();

  if (!raw) {
    return err('El teléfono no puede estar vacío.');
  }

  if (!PHONE_PATTERN.test(raw)) {
    return err('El teléfono contiene caracteres no válidos.');
  }

  const digitsOnly = raw.replace(/[^\d+]/g, '');

  if (digitsOnly.replace('+', '').length < 5) {
    return err('El teléfono es demasiado corto.');
  }

  return ok(`tel:${digitsOnly}`);
}
