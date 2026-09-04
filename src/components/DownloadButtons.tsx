export type DownloadFormat = 'png' | 'svg' | 'pdf';

interface DownloadButtonsProps {
  disabled: boolean;
  onDownload: (format: DownloadFormat) => void;
}

export function DownloadButtons({ disabled, onDownload }: DownloadButtonsProps) {
  const disabledHint = disabled ? 'Completa el formulario para poder descargar el QR' : undefined;

  return (
    <div className="download-buttons">
      <button
        type="button"
        disabled={disabled}
        title={disabledHint}
        aria-disabled={disabled}
        onClick={() => onDownload('png')}
      >
        Descargar PNG
      </button>
      <button
        type="button"
        disabled={disabled}
        title={disabledHint}
        aria-disabled={disabled}
        onClick={() => onDownload('svg')}
      >
        Descargar SVG
      </button>
      <button
        type="button"
        disabled={disabled}
        title={disabledHint}
        aria-disabled={disabled}
        onClick={() => onDownload('pdf')}
      >
        Descargar PDF
      </button>
    </div>
  );
}
