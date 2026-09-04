import { CUSTOM_TEMPLATE_ID, QR_TEMPLATES } from '../content/templates';
import { SOCIAL_TEMPLATES } from '../content/socialTemplates';

interface TemplateSelectorProps {
  value: string;
  onChange: (id: string) => void;
}

const SOCIAL_IDS = new Set(SOCIAL_TEMPLATES.map((s) => s.id));

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  const selected = QR_TEMPLATES.find((t) => t.id === value);
  const genericTemplates = QR_TEMPLATES.filter((t) => !SOCIAL_IDS.has(t.id));
  const socialTemplates = QR_TEMPLATES.filter((t) => SOCIAL_IDS.has(t.id));

  return (
    <div className="form-field">
      <label htmlFor="template-select">Estilo</label>
      <select id="template-select" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value={CUSTOM_TEMPLATE_ID}>Personalizado (elegir colores)</option>
        <optgroup label="General">
          {genericTemplates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.label}
            </option>
          ))}
        </optgroup>
        <optgroup label="Redes sociales">
          {socialTemplates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.label}
            </option>
          ))}
        </optgroup>
      </select>
      {selected && <p className="form-hint">{selected.description}</p>}
    </div>
  );
}
