import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { ErrorCorrectionLevel } from '../content/legibility';
import type { QrStyle } from '../content/templates';

export interface QrPreviewHandle {
  download: (extension: 'png' | 'svg', fileName: string) => Promise<void>;
}

interface QrPreviewProps {
  data: string | null;
  size?: number;
  style: QrStyle;
  errorCorrectionLevel?: ErrorCorrectionLevel;
  logoImage?: string | null;
}

// El margen (quiet zone) se calcula como proporción del tamaño en vez de un
// valor fijo en píxeles, para que siga siendo un margen real sin importar
// el tamaño de vista previa o de descarga (ver requisitos.md, "Calidad de lectura").
const MARGIN_RATIO = 0.08;

// Las descargas se generan en una resolución mayor a la del preview en pantalla,
// para que el PNG se pueda imprimir o ampliar sin perder nitidez.
const DOWNLOAD_SIZE = 1000;

// Proporción del ancho del QR que ocupa el logo. Se mantiene conservadora
// (en vez del 0.4 por defecto de la librería) para no tapar demasiados
// módulos, incluso con corrección de errores alta.
const LOGO_SIZE_RATIO = 0.22;

export const QrPreview = forwardRef<QrPreviewHandle, QrPreviewProps>(function QrPreview(
  { data, size = 240, style, errorCorrectionLevel = 'M', logoImage = null },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  const buildOptions = (targetSize: number) => ({
    type: 'svg' as const,
    width: targetSize,
    height: targetSize,
    data: data ?? ' ',
    margin: Math.round(targetSize * MARGIN_RATIO),
    dotsOptions: {
      type: style.dotsType,
      ...(style.dotsGradient ? { gradient: style.dotsGradient } : { color: style.dotsColor ?? '#111111' }),
    },
    cornersSquareOptions: {
      type: style.cornersSquareType,
      color: style.cornersSquareColor ?? style.dotsColor ?? '#111111',
    },
    cornersDotOptions: {
      type: style.cornersDotType,
      color: style.cornersDotColor ?? style.dotsColor ?? '#111111',
    },
    backgroundOptions: { color: style.backgroundColor },
    qrOptions: { errorCorrectionLevel },
    ...(logoImage
      ? {
          image: logoImage,
          imageOptions: {
            hideBackgroundDots: true,
            imageSize: LOGO_SIZE_RATIO,
            margin: Math.round(targetSize * 0.015),
          },
        }
      : {}),
  });

  useEffect(() => {
    if (!containerRef.current) return;

    qrRef.current = new QRCodeStyling(buildOptions(size));
    containerRef.current.innerHTML = '';
    qrRef.current.append(containerRef.current);
    // Solo se crea una vez; las actualizaciones posteriores usan .update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    qrRef.current?.update(buildOptions(size));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, size, style, errorCorrectionLevel, logoImage]);

  useImperativeHandle(ref, () => ({
    download: async (extension, fileName) => {
      if (!data) return;
      // Instancia aparte, en alta resolución, solo para exportar: no toca
      // el preview que el usuario está viendo.
      const exportQr = new QRCodeStyling(buildOptions(DOWNLOAD_SIZE));
      await exportQr.download({ name: fileName, extension });
    },
  }));

  return <div ref={containerRef} className="qr-preview" aria-label="Vista previa del código QR" />;
});
