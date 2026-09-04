import type { ContentType } from '../content/types';

interface ContentTypeSelectorProps {
  value: ContentType;
  onChange: (value: ContentType) => void;
}

const OPTIONS: { value: ContentType; label: string }[] = [
  { value: 'url', label: 'Enlace' },
  { value: 'text', label: 'Texto' },
  { value: 'phone', label: 'Teléfono' },
  { value: 'email', label: 'Correo' },
  { value: 'wifi', label: 'WiFi' },
  { value: 'whatsapp', label: 'WhatsApp' },
];

export function ContentTypeSelector({ value, onChange }: ContentTypeSelectorProps) {
  return (
    <div className="type-selector" role="tablist" aria-label="Tipo de contenido">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          className={`type-selector-btn${value === option.value ? ' is-active' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
