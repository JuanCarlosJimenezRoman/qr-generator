import { type EncodeResult, ok, err } from '../result';
import { stripTrackingParams } from './trackingParams';

export interface UrlInput {
  url: string;
  /** Si es true, quita parámetros de seguimiento conocidos (utm_, fbclid, mibextid, etc.). */
  cleanTracking?: boolean;
}

const HAS_PROTOCOL = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//;

/**
 * Normaliza y valida una URL. Si no trae protocolo, asume https://.
 * Solo se aceptan esquemas http y https.
 */
export function encodeUrl(input: UrlInput): EncodeResult {
  const raw = input.url.trim();

  if (!raw) {
    return err('La URL no puede estar vacía.');
  }

  const withProtocol = HAS_PROTOCOL.test(raw) ? raw : `https://${raw}`;

  let parsed: URL;
  try {
    parsed = new URL(withProtocol);
  } catch {
    return err('La URL no es válida.');
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return err('Solo se admiten URLs http:// o https://.');
  }

  const normalized = parsed.toString();

  if (input.cleanTracking) {
    return ok(stripTrackingParams(normalized).url);
  }

  return ok(normalized);
}
