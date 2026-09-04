// Parámetros de seguimiento/analítica conocidos: no cambian a dónde apunta el
// enlace, pero sí lo alargan innecesariamente (y por lo tanto hacen el QR más
// denso y difícil de escanear). Se listan por nombre exacto y por prefijo.
//
// La lista es intencionalmente conservadora: solo incluye parámetros bien
// documentados como puramente analíticos. Ante la duda se deja el parámetro,
// para no arriesgarse a romper un enlace que sí lo necesite para funcionar
// (justo el tipo de fallo inesperado que este proyecto busca evitar).
const TRACKING_PARAM_NAMES = new Set([
  'fbclid',
  'gclid',
  'gclsrc',
  'dclid',
  'wbraid',
  'gbraid',
  'msclkid',
  'mc_cid',
  'mc_eid',
  'mibextid',
  'igshid',
  'igsh',
  'yclid',
  'twclid',
  'ttclid',
  'vero_id',
  'mkt_tok',
  '_ga',
  '_gl',
  'ref_src',
]);

const TRACKING_PARAM_PREFIXES = ['utm_'];

function isTrackingParam(name: string): boolean {
  const lower = name.toLowerCase();
  if (TRACKING_PARAM_NAMES.has(lower)) return true;
  return TRACKING_PARAM_PREFIXES.some((prefix) => lower.startsWith(prefix));
}

export interface StripTrackingResult {
  url: string;
  removedCount: number;
}

/**
 * Quita parámetros de seguimiento/analítica conocidos (utm_*, fbclid, gclid,
 * mibextid, etc.) de la query string de una URL. No toca el dominio, la ruta
 * ni el resto de los parámetros.
 */
export function stripTrackingParams(url: string): StripTrackingResult {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { url, removedCount: 0 };
  }

  const toRemove: string[] = [];
  parsed.searchParams.forEach((_, key) => {
    if (isTrackingParam(key)) toRemove.push(key);
  });

  for (const key of toRemove) {
    parsed.searchParams.delete(key);
  }

  return { url: parsed.toString(), removedCount: toRemove.length };
}

/**
 * Cuenta cuántos parámetros de seguimiento tiene una URL sin modificarla.
 * Se usa para sugerirle al usuario que active la limpieza.
 */
export function countTrackingParams(url: string): number {
  try {
    const parsed = new URL(url);
    let count = 0;
    parsed.searchParams.forEach((_, key) => {
      if (isTrackingParam(key)) count += 1;
    });
    return count;
  } catch {
    return 0;
  }
}
