// Validación del logo/imagen que el usuario puede superponer al centro del QR.
// Es lógica pura (sin FileReader ni DOM) para poder probarla con Vitest; el
// componente que la usa se encarga de leer el archivo real.

const MAX_LOGO_BYTES = 3 * 1024 * 1024; // 3 MB

const ALLOWED_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']);

export interface LogoFileInfo {
  size: number;
  type: string;
}

export interface LogoValidationResult {
  ok: boolean;
  error?: string;
}

export function validateLogoFile(file: LogoFileInfo): LogoValidationResult {
  if (!ALLOWED_TYPES.has(file.type)) {
    return { ok: false, error: 'Formato no admitido. Usa una imagen PNG, JPG, WEBP o SVG.' };
  }

  if (file.size > MAX_LOGO_BYTES) {
    return { ok: false, error: 'La imagen es demasiado grande (máximo 3 MB).' };
  }

  return { ok: true };
}
