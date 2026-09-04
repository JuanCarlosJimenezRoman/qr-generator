import type { UrlInput } from '../../content/encoders/url';
import { countTrackingParams } from '../../content/encoders/trackingParams';

interface UrlFormProps {
  value: UrlInput;
  onChange: (value: UrlInput) => void;
  placeholder?: string;
}

export function UrlForm({ value, onChange, placeholder = 'ejemplo.com o https://ejemplo.com' }: UrlFormProps) {
  const trackingCount = countTrackingParams(value.url);

  return (
    <div className="form-field">
      <label htmlFor="url-input">Enlace</label>
      <input
        id="url-input"
        type="text"
        placeholder={placeholder}
        value={value.url}
        onChange={(e) => onChange({ ...value, url: e.target.value })}
        autoComplete="off"
      />

      <div className="form-field-checkbox">
        <label htmlFor="url-clean-tracking">
          <input
            id="url-clean-tracking"
            type="checkbox"
            checked={Boolean(value.cleanTracking)}
            onChange={(e) => onChange({ ...value, cleanTracking: e.target.checked })}
          />
          Quitar parámetros de seguimiento (utm, fbclid, mibextid, etc.)
        </label>
      </div>

      {!value.cleanTracking && trackingCount > 0 && (
        <p className="form-hint">
          Este enlace tiene {trackingCount === 1 ? '1 parámetro' : `${trackingCount} parámetros`}{' '}
          de seguimiento que no afectan a dónde lleva el enlace. Puedes activar la casilla de
          arriba para quitarlos y que el QR salga menos denso.
        </p>
      )}
    </div>
  );
}
