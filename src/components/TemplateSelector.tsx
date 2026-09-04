import { CUSTOM_TEMPLATE_ID, QR_TEMPLATES } from '../content/templates';

interface TemplateSelectorProps {
  value: string;
  onChange: (id: string) => void;
}

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  const selected = QR_TEMPLATES.find((t) => t.id === value);

  return (
    <div className="form-field">
      <label htmlFor="template-select">Estilo</label>
      <select id="template-select" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value={CUSTOM_TEMPLATE_ID}>Personalizado (elegir colores)</option>
        {QR_TEMPLATES.map((template) => (
          <option key={template.id} value={template.id}>
            {template.label}
          </option>
        ))}
      </select>
      {selected && <p className="form-hint">{selected.description}</p>}
    </div>
  );
}
