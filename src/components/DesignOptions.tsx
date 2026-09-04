import type { ErrorCorrectionLevel } from '../content/legibility';

interface DesignOptionsProps {
  dotColor: string;
  backgroundColor: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
  onDotColorChange: (value: string) => void;
  onBackgroundColorChange: (value: string) => void;
  onErrorCorrectionLevelChange: (value: ErrorCorrectionLevel) => void;
}

const ECC_OPTIONS: { value: ErrorCorrectionLevel; label: string }[] = [
  { value: 'L', label: 'Baja (7%) — QR más simple' },
  { value: 'M', label: 'Media (15%) — recomendada' },
  { value: 'Q', label: 'Alta (25%) — más resistente a daños' },
  { value: 'H', label: 'Muy alta (30%) — para imprimir con logo' },
];

export function DesignOptions({
  dotColor,
  backgroundColor,
  errorCorrectionLevel,
  onDotColorChange,
  onBackgroundColorChange,
  onErrorCorrectionLevelChange,
}: DesignOptionsProps) {
  return (
    <div className="design-options">
      <div className="design-options-colors">
        <div className="form-field">
          <label htmlFor="dot-color">Color del QR</label>
          <input
            id="dot-color"
            type="color"
            value={dotColor}
            onChange={(e) => onDotColorChange(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="bg-color">Color de fondo</label>
          <input
            id="bg-color"
            type="color"
            value={backgroundColor}
            onChange={(e) => onBackgroundColorChange(e.target.value)}
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="ecc-level">Nivel de corrección de errores</label>
        <select
          id="ecc-level"
          value={errorCorrectionLevel}
          onChange={(e) => onErrorCorrectionLevelChange(e.target.value as ErrorCorrectionLevel)}
        >
          {ECC_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
