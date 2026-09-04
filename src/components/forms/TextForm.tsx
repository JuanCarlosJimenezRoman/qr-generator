import type { TextInput } from '../../content/encoders/text';

interface TextFormProps {
  value: TextInput;
  onChange: (value: TextInput) => void;
}

export function TextForm({ value, onChange }: TextFormProps) {
  return (
    <div className="form-field">
      <label htmlFor="text-input">Texto</label>
      <textarea
        id="text-input"
        rows={4}
        placeholder="Escribe el texto que quieres codificar"
        value={value.text}
        onChange={(e) => onChange({ text: e.target.value })}
      />
    </div>
  );
}
