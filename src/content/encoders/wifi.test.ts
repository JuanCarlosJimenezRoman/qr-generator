import { describe, expect, it } from 'vitest';
import { encodeWifi } from './wifi';

describe('encodeWifi', () => {
  it('genera el string WIFI: estándar para una red WPA', () => {
    expect(encodeWifi({ ssid: 'CasaWifi', password: 'clave123', security: 'WPA' })).toEqual({
      ok: true,
      value: 'WIFI:T:WPA;S:CasaWifi;P:clave123;;',
    });
  });

  it('omite el campo P para redes abiertas', () => {
    expect(encodeWifi({ ssid: 'CafeGratis', security: 'nopass' })).toEqual({
      ok: true,
      value: 'WIFI:T:nopass;S:CafeGratis;;',
    });
  });

  it('agrega H:true cuando la red está oculta', () => {
    expect(
      encodeWifi({ ssid: 'Oculta', password: '12345678', security: 'WPA', hidden: true }),
    ).toEqual({ ok: true, value: 'WIFI:T:WPA;S:Oculta;P:12345678;H:true;;' });
  });

  it('escapa punto y coma, coma, dos puntos y backslash en el SSID', () => {
    const result = encodeWifi({ ssid: 'Casa;Wifi,Piso:2\\A', password: 'x', security: 'WPA' });
    expect(result).toEqual({ ok: true, value: 'WIFI:T:WPA;S:Casa\\;Wifi\\,Piso\\:2\\\\A;P:x;;' });
  });

  it('escapa caracteres especiales en la contraseña', () => {
    const result = encodeWifi({ ssid: 'Red', password: 'a;b,c:d\\e', security: 'WPA' });
    expect(result).toEqual({ ok: true, value: 'WIFI:T:WPA;S:Red;P:a\\;b\\,c\\:d\\\\e;;' });
  });

  it('rechaza SSID vacío', () => {
    expect(encodeWifi({ ssid: '', password: 'x', security: 'WPA' }).ok).toBe(false);
  });

  it('rechaza redes WPA sin contraseña', () => {
    expect(encodeWifi({ ssid: 'Red', security: 'WPA' }).ok).toBe(false);
  });
});
