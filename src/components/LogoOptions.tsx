import { useRef, useState } from 'react';
import { validateLogoFile } from '../content/logo';

interface LogoOptionsProps {
  logo: string | null;
  onLogoChange: (dataUrl: string | null) => void;
}

export function LogoOptions({ logo, onLogoChange }: LogoOptionsProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    const validation = validateLogoFile({ size: file.size, type: file.type });
    if (!validation.ok) {
      setError(validation.error ?? 'No se pudo usar esta imagen.');
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onLogoChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onLogoChange(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="form-field logo-options">
      <label htmlFor="logo-input">Logo o imagen en el centro (opcional)</label>

      <div className="logo-options-row">
        {logo && <img src={logo} alt="Vista previa del logo" className="logo-preview" />}
        <input
          id="logo-input"
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        {logo && (
          <button type="button" className="logo-remove-btn" onClick={handleRemove}>
            Quitar
          </button>
        )}
      </div>

      {error && (
        <p className="form-hint form-hint-error" role="alert">
          {error}
        </p>
      )}

      {logo && (
        <p className="form-hint">
          Con logo, usa corrección de errores "Alta" o "Muy alta" para que el QR se siga
          escaneando bien.
        </p>
      )}
    </div>
  );
}
