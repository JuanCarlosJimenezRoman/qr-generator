import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { ErrorCorrectionLevel } from '../content/legibility';

export interface QrPreviewHandle {
  download: (extension: 'png' | 'svg', fileName: string) => Promise<void>;
}

interface QrPreviewProps {
  data: string | null;
  size?: number;
  color?: string;
  backgroundColor?: string;
  errorCorrectionLevel?: ErrorCorrectionLevel;
}

// El margen (quiet zone) se calcula como proporción del tamaño en vez de un
// valor fijo en píxeles, para que siga siendo un margen real sin importar
// el tamaño de vista previa o de descarga (ver requisitos.md, "Calidad de lectura").
const MARGIN_RATIO = 0.08;

// Las descargas se generan en una resolución mayor a la del preview en pantalla,
// para que el PNG se pueda imprimir o ampliar sin perder nitidez.
const DOWNLOAD_SIZE = 1000;

export const QrPreview = forwardRef<QrPreviewHandle, QrPreviewProps>(function QrPreview(
  { data, size = 240, color = '#111111', backgroundColor = '#ffffff', errorCorrectionLevel = 'M' },
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
    dotsOptions: { color, type: 'square' as const },
    backgroundOptions: { color: backgroundColor },
    qrOptions: { errorCorrectionLevel },
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
  }, [data, size, color, backgroundColor, errorCorrectionLevel]);

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
