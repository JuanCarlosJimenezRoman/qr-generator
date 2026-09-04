import type { EmailInput } from '../../content/encoders/email';

interface EmailFormProps {
  value: EmailInput;
  onChange: (value: EmailInput) => void;
}

export function EmailForm({ value, onChange }: EmailFormProps) {
  return (
    <>
      <div className="form-field">
        <label htmlFor="email-to">Correo destinatario</label>
        <input
          id="email-to"
          type="email"
          placeholder="alguien@ejemplo.com"
          value={value.to}
          onChange={(e) => onChange({ ...value, to: e.target.value })}
          autoComplete="off"
        />
      </div>
      <div className="form-field">
        <label htmlFor="email-subject">Asunto (opcional)</label>
        <input
          id="email-subject"
          type="text"
          value={value.subject ?? ''}
          onChange={(e) => onChange({ ...value, subject: e.target.value })}
        />
      </div>
      <div className="form-field">
        <label htmlFor="email-body">Mensaje (opcional)</label>
        <textarea
          id="email-body"
          rows={3}
          value={value.body ?? ''}
          onChange={(e) => onChange({ ...value, body: e.target.value })}
        />
      </div>
    </>
  );
}
