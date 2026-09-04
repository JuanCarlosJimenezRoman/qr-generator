import { checkContentLength, checkContrast, checkLogoErrorCorrection } from '../content/legibility';
import type { ErrorCorrectionLevel } from '../content/legibility';

interface DesignWarningsProps {
  encodedValue: string;
  dotColor: string;
  backgroundColor: string;
  hasLogo: boolean;
  errorCorrectionLevel: ErrorCorrectionLevel;
}

export function DesignWarnings({
  encodedValue,
  dotColor,
  backgroundColor,
  hasLogo,
  errorCorrectionLevel,
}: DesignWarningsProps) {
  const contrast = checkContrast(dotColor, backgroundColor);
  const length = checkContentLength(encodedValue);
  const logoEcc = checkLogoErrorCorrection(hasLogo, errorCorrectionLevel);

  if (contrast.ok && length.ok && logoEcc.ok) {
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
      {!logoEcc.ok && (
        <li>
          Con un logo en el centro, la corrección de errores actual puede no ser suficiente para
          que el QR se escanee bien. Cambia a "Alta" o "Muy alta" en las opciones de diseño.
        </li>
      )}
    </ul>
  );
}
