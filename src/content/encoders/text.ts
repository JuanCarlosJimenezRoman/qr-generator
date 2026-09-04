import { type EncodeResult, ok, err } from '../result';

export interface TextInput {
  text: string;
}

const MAX_LENGTH = 2000;

export function encodeText(input: TextInput): EncodeResult {
  const value = input.text.trim();

  if (!value) {
    return err('El texto no puede estar vacío.');
  }

  if (value.length > MAX_LENGTH) {
    return err(`El texto es demasiado largo (máximo ${MAX_LENGTH} caracteres).`);
  }

  return ok(value);
}
