import type { PhoneInput } from '../../content/encoders/phone';

interface PhoneFormProps {
  value: PhoneInput;
  onChange: (value: PhoneInput) => void;
}

export function PhoneForm({ value, onChange }: PhoneFormProps) {
  return (
    <div className="form-field">
      <label htmlFor="phone-input">Teléfono</label>
      <input
        id="phone-input"
        type="tel"
        placeholder="+52 55 1234 5678"
        value={value.phone}
        onChange={(e) => onChange({ phone: e.target.value })}
        autoComplete="off"
      />
    </div>
  );
}
