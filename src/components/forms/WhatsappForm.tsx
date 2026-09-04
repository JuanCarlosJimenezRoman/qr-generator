import type { WhatsappInput } from '../../content/encoders/whatsapp';

interface WhatsappFormProps {
  value: WhatsappInput;
  onChange: (value: WhatsappInput) => void;
}

export function WhatsappForm({ value, onChange }: WhatsappFormProps) {
  return (
    <>
      <div className="form-field">
        <label htmlFor="whatsapp-phone">Teléfono (con código de país)</label>
        <input
          id="whatsapp-phone"
          type="tel"
          placeholder="+52 55 1234 5678"
          value={value.phone}
          onChange={(e) => onChange({ ...value, phone: e.target.value })}
          autoComplete="off"
        />
      </div>
      <div className="form-field">
        <label htmlFor="whatsapp-message">Mensaje (opcional)</label>
        <textarea
          id="whatsapp-message"
          rows={3}
          value={value.message ?? ''}
          onChange={(e) => onChange({ ...value, message: e.target.value })}
        />
      </div>
    </>
  );
}
