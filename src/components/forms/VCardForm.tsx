import type { VCardInput } from '../../content/encoders/vcard';

interface VCardFormProps {
  value: VCardInput;
  onChange: (value: VCardInput) => void;
}

export function VCardForm({ value, onChange }: VCardFormProps) {
  return (
    <>
      <div className="form-field">
        <label htmlFor="vcard-name">Nombre completo</label>
        <input
          id="vcard-name"
          type="text"
          value={value.fullName}
          onChange={(e) => onChange({ ...value, fullName: e.target.value })}
          autoComplete="off"
        />
      </div>
      <div className="form-field">
        <label htmlFor="vcard-org">Organización (opcional)</label>
        <input
          id="vcard-org"
          type="text"
          value={value.organization ?? ''}
          onChange={(e) => onChange({ ...value, organization: e.target.value })}
        />
      </div>
      <div className="form-field">
        <label htmlFor="vcard-title">Cargo (opcional)</label>
        <input
          id="vcard-title"
          type="text"
          value={value.title ?? ''}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
      </div>
      <div className="form-field">
        <label htmlFor="vcard-phone">Teléfono (opcional)</label>
        <input
          id="vcard-phone"
          type="tel"
          placeholder="+52 55 1234 5678"
          value={value.phone ?? ''}
          onChange={(e) => onChange({ ...value, phone: e.target.value })}
          autoComplete="off"
        />
      </div>
      <div className="form-field">
        <label htmlFor="vcard-email">Correo (opcional)</label>
        <input
          id="vcard-email"
          type="email"
          value={value.email ?? ''}
          onChange={(e) => onChange({ ...value, email: e.target.value })}
          autoComplete="off"
        />
      </div>
      <div className="form-field">
        <label htmlFor="vcard-url">Sitio web (opcional)</label>
        <input
          id="vcard-url"
          type="text"
          placeholder="ejemplo.com"
          value={value.url ?? ''}
          onChange={(e) => onChange({ ...value, url: e.target.value })}
          autoComplete="off"
        />
      </div>
    </>
  );
}
