import { describe, expect, it } from 'vitest';
import { validateLogoFile } from './logo';

describe('validateLogoFile', () => {
  it('acepta PNG dentro del límite de tamaño', () => {
    expect(validateLogoFile({ size: 500_000, type: 'image/png' })).toEqual({ ok: true });
  });

  it('acepta JPG, WEBP y SVG', () => {
    expect(validateLogoFile({ size: 1000, type: 'image/jpeg' }).ok).toBe(true);
    expect(validateLogoFile({ size: 1000, type: 'image/webp' }).ok).toBe(true);
    expect(validateLogoFile({ size: 1000, type: 'image/svg+xml' }).ok).toBe(true);
  });

  it('rechaza formatos no admitidos, como GIF', () => {
    const result = validateLogoFile({ size: 1000, type: 'image/gif' });
    expect(result.ok).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('rechaza archivos que exceden el límite de 3 MB', () => {
    const result = validateLogoFile({ size: 3 * 1024 * 1024 + 1, type: 'image/png' });
    expect(result.ok).toBe(false);
  });

  it('acepta un archivo justo en el límite de 3 MB', () => {
    expect(validateLogoFile({ size: 3 * 1024 * 1024, type: 'image/png' }).ok).toBe(true);
  });
});
