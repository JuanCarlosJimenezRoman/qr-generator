// src/components/QrEditor.tsx
import { useState, useRef } from 'react';
import { QrPreview, type QrPreviewHandle } from './QrPreview';

interface QrEditorProps {
  onSave: (data: string) => void;
  onCancel: () => void;
}

export function QrEditor({ onSave, onCancel }: QrEditorProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [decodedData, setDecodedData] = useState<string | null>(null);
  const [isDecoding, setIsDecoding] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageData = event.target?.result as string;
      setUploadedImage(imageData);
      
      // Intentar decodificar el QR (usando librería como jsQR)
      setIsDecoding(true);
      try {
        // const decoded = await decodeQR(imageData);
        // setDecodedData(decoded);
        // Simulación
        setTimeout(() => {
          setDecodedData('https://ejemplo.com/datos-decodificados');
          setIsDecoding(false);
        }, 1000);
      } catch (error) {
        console.error('Error decodificando QR:', error);
        setIsDecoding(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="qr-editor">
      <h3>✏️ Editar QR existente</h3>
      
      {!uploadedImage ? (
        <div className="qr-editor-upload">
          <p>Sube un código QR para editarlo</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="qr-editor-file-input"
          />
          <button
            className="qr-editor-upload-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            📤 Subir QR
          </button>
        </div>
      ) : (
        <div className="qr-editor-preview">
          <div className="qr-editor-images">
            <div className="qr-editor-original">
              <h4>Original</h4>
              <img src={uploadedImage} alt="QR original" />
            </div>
            <div className="qr-editor-edited">
              <h4>Editado</h4>
              {isDecoding ? (
                <p>Decodificando...</p>
              ) : decodedData ? (
                <>
                  <p>✅ Decodificado: {decodedData}</p>
                  {/* Aquí iría el QR regenerado con nuevas opciones */}
                  <QrPreview data={decodedData} />
                </>
              ) : (
                <p>❌ No se pudo decodificar el QR</p>
              )}
            </div>
          </div>
          
          <div className="qr-editor-actions">
            <button onClick={onCancel}>Cancelar</button>
            <button onClick={() => onSave(decodedData || '')}>Guardar cambios</button>
          </div>
        </div>
      )}
    </div>
  );
}