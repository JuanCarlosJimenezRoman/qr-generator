import { type EncodeResult, ok, err } from '../result';

export type WifiSecurity = 'WPA' | 'WEP' | 'nopass';

export interface WifiInput {
  ssid: string;
  password?: string;
  security: WifiSecurity;
  hidden?: boolean;
}

// Caracteres que el estándar WIFI: QR requiere escapar con backslash: \ ; , : "
const ESCAPE_PATTERN = /([\\;,:"])/g;

function escapeWifiField(value: string): string {
  return value.replace(ESCAPE_PATTERN, '\\$1');
}

export function encodeWifi(input: WifiInput): EncodeResult {
  const ssid = input.ssid.trim();

  if (!ssid) {
    return err('El nombre de la red (SSID) no puede estar vacío.');
  }

  if (input.security !== 'nopass' && !input.password) {
    return err('Esta red requiere una contraseña.');
  }

  const parts = [`T:${input.security}`, `S:${escapeWifiField(ssid)}`];

  if (input.security !== 'nopass') {
    parts.push(`P:${escapeWifiField(input.password ?? '')}`);
  }

  if (input.hidden) {
    parts.push('H:true');
  }

  return ok(`WIFI:${parts.join(';')};;`);
}
