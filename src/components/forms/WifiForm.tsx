import type { WifiInput, WifiSecurity } from '../../content/encoders/wifi';

interface WifiFormProps {
  value: WifiInput;
  onChange: (value: WifiInput) => void;
}

const SECURITY_OPTIONS: { value: WifiSecurity; label: string }[] = [
  { value: 'WPA', label: 'WPA/WPA2' },
  { value: 'WEP', label: 'WEP' },
  { value: 'nopass', label: 'Sin contraseña' },
];

export function WifiForm({ value, onChange }: WifiFormProps) {
  return (
    <>
      <div className="form-field">
        <label htmlFor="wifi-ssid">Nombre de la red (SSID)</label>
        <input
          id="wifi-ssid"
          type="text"
          value={value.ssid}
          onChange={(e) => onChange({ ...value, ssid: e.target.value })}
          autoComplete="off"
        />
      </div>
      <div className="form-field">
        <label htmlFor="wifi-security">Seguridad</label>
        <select
          id="wifi-security"
          value={value.security}
          onChange={(e) => onChange({ ...value, security: e.target.value as WifiSecurity })}
        >
          {SECURITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {value.security !== 'nopass' && (
        <div className="form-field">
          <label htmlFor="wifi-password">Contraseña</label>
          <input
            id="wifi-password"
            type="text"
            value={value.password ?? ''}
            onChange={(e) => onChange({ ...value, password: e.target.value })}
            autoComplete="off"
          />
        </div>
      )}
      <div className="form-field form-field-checkbox">
        <label htmlFor="wifi-hidden">
          <input
            id="wifi-hidden"
            type="checkbox"
            checked={Boolean(value.hidden)}
            onChange={(e) => onChange({ ...value, hidden: e.target.checked })}
          />
          Red oculta
        </label>
      </div>
    </>
  );
}
