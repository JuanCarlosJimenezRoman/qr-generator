import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

interface QrPreviewProps {
  data: string | null;
  size?: number;
  color?: string;
  backgroundColor?: string;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
}

export function QrPreview({
  data,
  size = 240,
  color = '#111111',
  backgroundColor = '#ffffff',
  errorCorrectionLevel = 'M',
}: QrPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    qrRef.current = new QRCodeStyling({
      type: 'svg',
      width: size,
      height: size,
      data: data ?? ' ',
      margin: 8,
      dotsOptions: { color, type: 'square' },
      backgroundOptions: { color: backgroundColor },
      qrOptions: { errorCorrectionLevel },
    });

    containerRef.current.innerHTML = '';
    qrRef.current.append(containerRef.current);
    // Solo se crea una vez; las actualizaciones posteriores usan .update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    qrRef.current?.update({
      data: data ?? ' ',
      width: size,
      height: size,
      dotsOptions: { color, type: 'square' },
      backgroundOptions: { color: backgroundColor },
      qrOptions: { errorCorrectionLevel },
    });
  }, [data, size, color, backgroundColor, errorCorrectionLevel]);

  return <div ref={containerRef} className="qr-preview" aria-label="Vista previa del código QR" />;
}
