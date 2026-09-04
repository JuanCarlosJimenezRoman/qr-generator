import { checkContentLength, checkContrast } from '../content/legibility';

interface DesignWarningsProps {
  encodedValue: string;
  dotColor: string;
  backgroundColor: string;
}

export function DesignWarnings({ encodedValue, dotColor, backgroundColor }: DesignWarningsProps) {
  const contrast = checkContrast(dotColor, backgroundColor);
  const length = checkContentLength(encodedValue);

  if (contrast.ok && length.ok) {
    return null;
  }

  return (
    <ul className="design-warnings" role="status">
      {!contrast.ok && (
        <li>
          El color y el fondo tienen poco contraste ({contrast.ratio.toFixed(1)}:1). Puede que el
          QR no se escanee bien; prueba con colores más distintos entre sí.
        </li>
      )}
      {!length.ok && (
        <li>
          El contenido es largo ({length.bytes} bytes), lo que genera un QR muy denso. Sigue
          siendo válido, pero será más difícil de escanear con una cámara; si puedes, acórtalo.
        </li>
      )}
    </ul>
  );
}
