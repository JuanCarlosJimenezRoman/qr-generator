import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { checkContentLength, type ErrorCorrectionLevel } from '../content/legibility';
import type { QrStyle } from '../content/templates';

export interface QrPreviewHandle {
  download: (extension: 'png' | 'svg', fileName: string) => Promise<void>;
  downloadPdf: (fileName: string, label: string) => Promise<void>;
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
// para que el PNG (y el PDF, que reusa esa imagen) se puedan imprimir o
// ampliar sin perder nitidez.
const DOWNLOAD_SIZE = 1000;

// Proporción del ancho del QR que ocupa el logo. Se mantiene conservadora
// (en vez del 0.4 por defecto de la librería) para no tapar demasiados
// módulos, incluso con corrección de errores alta.
const LOGO_SIZE_RATIO = 0.22;

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new Error('No se pudo leer la imagen del QR.'));
    };
    reader.onerror = () => reject(reader.error ?? new Error('No se pudo leer la imagen del QR.'));
    reader.readAsDataURL(blob);
  });
}

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
    downloadPdf: async (fileName, label) => {
      if (!data) return;

      // jsPDF se carga solo cuando el usuario pide un PDF (import dinámico),
      // para no aumentar el peso inicial de la app para todo el mundo.
      const { default: jsPDF } = await import('jspdf');

      const exportQr = new QRCodeStyling(buildOptions(DOWNLOAD_SIZE));
      const raw = await exportQr.getRawData('png');
      if (!raw || !(raw instanceof Blob)) return;
      const imageDataUrl = await blobToDataUrl(raw);

      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const qrSizeMm = 120;
      const qrX = (pageWidth - qrSizeMm) / 2;
      const qrY = 50;

      doc.setFontSize(16);
      doc.text(label, pageWidth / 2, qrY - 15, { align: 'center' });

      doc.addImage(imageDataUrl, 'PNG', qrX, qrY, qrSizeMm, qrSizeMm);

      // Solo se muestra el contenido como texto de referencia si es corto y
      // de una sola línea (por ejemplo un enlace o un teléfono); un vCard o
      // un texto largo no aportan como pie de página.
      if (!data.includes('\n') && checkContentLength(data).ok) {
        doc.setFontSize(10);
        const lines = doc.splitTextToSize(data, pageWidth - 40);
        doc.text(lines, pageWidth / 2, qrY + qrSizeMm + 12, { align: 'center' });
      }

      doc.save(`${fileName}.pdf`);
    },
  }));

  return <div ref={containerRef} className="qr-preview" aria-label="Vista previa del código QR" />;
});
