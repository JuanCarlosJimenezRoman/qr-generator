import type { UrlInput } from '../../content/encoders/url';

interface UrlFormProps {
  value: UrlInput;
  onChange: (value: UrlInput) => void;
}

export function UrlForm({ value, onChange }: UrlFormProps) {
  return (
    <div className="form-field">
      <label htmlFor="url-input">Enlace</label>
      <input
        id="url-input"
        type="text"
        placeholder="ejemplo.com o https://ejemplo.com"
        value={value.url}
        onChange={(e) => onChange({ url: e.target.value })}
        autoComplete="off"
      />
    </div>
  );
}
