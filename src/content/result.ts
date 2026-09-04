export type EncodeResult =
  | { ok: true; value: string }
  | { ok: false; error: string };

export const ok = (value: string): EncodeResult => ({ ok: true, value });
export const err = (error: string): EncodeResult => ({ ok: false, error });
