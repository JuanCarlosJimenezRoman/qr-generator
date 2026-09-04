interface DownloadButtonsProps {
  disabled: boolean;
  onDownload: (extension: 'png' | 'svg') => void;
}

export function DownloadButtons({ disabled, onDownload }: DownloadButtonsProps) {
  return (
    <div className="download-buttons">
      <button type="button" disabled={disabled} onClick={() => onDownload('png')}>
        Descargar PNG
      </button>
      <button type="button" disabled={disabled} onClick={() => onDownload('svg')}>
        Descargar SVG
      </button>
    </div>
  );
}
