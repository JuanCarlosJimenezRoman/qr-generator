import { useEffect, useMemo, useRef, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import './App.css';
import { LandingIntro } from './components/LandingIntro';
import { ContentTypeSelector } from './components/ContentTypeSelector';
import { ContentSummary } from './components/ContentSummary';
import { QrPreview, type QrPreviewHandle } from './components/QrPreview';
import { DownloadButtons } from './components/DownloadButtons';
import { DesignOptions } from './components/DesignOptions';
import { DesignWarnings } from './components/DesignWarnings';
import { LogoOptions } from './components/LogoOptions';
import { TemplateSelector } from './components/TemplateSelector';
import { SocialSelector } from './components/SocialSelector';
import { SocialPreview } from './components/SocialPreview';
import { DesignAccordion } from './components/DesignAccordion';
import { UrlForm } from './components/forms/UrlForm';
import { TextForm } from './components/forms/TextForm';
import { PhoneForm } from './components/forms/PhoneForm';
import { EmailForm } from './components/forms/EmailForm';
import { WifiForm } from './components/forms/WifiForm';
import { WhatsappForm } from './components/forms/WhatsappForm';
import { VCardForm } from './components/forms/VCardForm';
import { CONTENT_TYPE_LABELS, encodeContent, type ContentType } from './content/types';
import { buildQrFileName } from './content/fileName';
import type { ErrorCorrectionLevel } from './content/legibility';
import { CUSTOM_TEMPLATE_ID, primaryDotColor, resolveQrStyle } from './content/templates';
import { SOCIAL_TEMPLATES, type SocialTemplate } from './content/socialTemplates';
import type { UrlInput } from './content/encoders/url';
import type { TextInput } from './content/encoders/text';
import type { PhoneInput } from './content/encoders/phone';
import type { EmailInput } from './content/encoders/email';
import type { WifiInput } from './content/encoders/wifi';
import type { WhatsappInput } from './content/encoders/whatsapp';
import type { VCardInput } from './content/encoders/vcard';

interface FormState {
  url: UrlInput;
  text: TextInput;
  phone: PhoneInput;
  email: EmailInput;
  wifi: WifiInput;
  whatsapp: WhatsappInput;
  vcard: VCardInput;
}

const DEFAULT_FORM_STATE: FormState = {
  url: { url: '' },
  text: { text: '' },
  phone: { phone: '' },
  email: { to: '', subject: '', body: '' },
  wifi: { ssid: '', password: '', security: 'WPA', hidden: false },
  whatsapp: { phone: '', message: '' },
  vcard: { fullName: '', organization: '', title: '', phone: '', email: '', url: '' },
};

function App() {
  const [contentType, setContentType] = useState<ContentType>('url');
  const [formState, setFormState] = useState<FormState>(DEFAULT_FORM_STATE);
  const qrPreviewRef = useRef<QrPreviewHandle>(null);
  const [dotColor, setDotColor] = useState('#111111');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<ErrorCorrectionLevel>('M');
  const [logo, setLogo] = useState<string | null>(null);
  const [templateId, setTemplateId] = useState<string>(CUSTOM_TEMPLATE_ID);
  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null);
  const [urlPlaceholder, setUrlPlaceholder] = useState('ejemplo.com o https://ejemplo.com');

  // Las páginas guía (/guias/...) enlazan de vuelta con ?tipo=wifi|whatsapp|vcard
  // para dejar preseleccionado el tipo de contenido correcto.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get('tipo');
    if (tipo === 'wifi' || tipo === 'whatsapp' || tipo === 'vcard' || tipo === 'url') {
      setContentType(tipo);
      if (window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
    // Solo al montar: es una preselección inicial, no algo a re-evaluar en cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const encodeResult = useMemo(() => {
    switch (contentType) {
      case 'url':
        return encodeContent({ type: 'url', data: formState.url });
      case 'text':
        return encodeContent({ type: 'text', data: formState.text });
      case 'phone':
        return encodeContent({ type: 'phone', data: formState.phone });
      case 'email':
        return encodeContent({ type: 'email', data: formState.email });
      case 'wifi':
        return encodeContent({ type: 'wifi', data: formState.wifi });
      case 'whatsapp':
        return encodeContent({ type: 'whatsapp', data: formState.whatsapp });
      case 'vcard':
        return encodeContent({ type: 'vcard', data: formState.vcard });
    }
  }, [contentType, formState]);

  const qrStyle = useMemo(
    () => resolveQrStyle(templateId, { dotColor, backgroundColor }),
    [templateId, dotColor, backgroundColor],
  );

  const activeSocial: SocialTemplate | null =
    contentType === 'url' ? SOCIAL_TEMPLATES.find((s) => s.id === templateId) ?? null : null;

  const handleSocialSelect = (social: SocialTemplate) => {
    setContentType('url');
    setUrlPlaceholder(social.placeholder);
    setTemplateId(social.id);
  };

  const handleContentTypeChange = (type: ContentType) => {
    setContentType(type);
    setUrlPlaceholder('ejemplo.com o https://ejemplo.com');
  };

  const handleDownload = (format: 'png' | 'svg' | 'pdf') => {
    if (!encodeResult.ok) return;
    
    const fileName = buildQrFileName(contentType);
    
    // Feedback visual
    setDownloadFeedback(`Descargando ${format.toUpperCase()}...`);
    
    if (format === 'pdf') {
      void qrPreviewRef.current?.downloadPdf(fileName, CONTENT_TYPE_LABELS[contentType]);
    } else {
      void qrPreviewRef.current?.download(format, fileName);
    }
    
    // Limpiar feedback después de 2 segundos
    setTimeout(() => setDownloadFeedback(null), 2000);
  };

  const isQrReady = encodeResult.ok;

  return (
    <div className="app">
      <header className="app-header">
        <h1>✨ Generador de QR</h1>
        <p>Gratis, sin límites y sin conexión a ningún servidor: todo se genera en tu navegador.</p>
      </header>

      <main className="app-main">
        {/* Panel Izquierdo: Configuración */}
        <section className="app-panel app-panel-config">
          <SocialSelector activeId={activeSocial?.id ?? null} onSelect={handleSocialSelect} />

          <ContentTypeSelector value={contentType} onChange={handleContentTypeChange} />

          <div className="app-form">
            {contentType === 'url' && (
              <>
                <UrlForm
                  value={formState.url}
                  onChange={(url) => setFormState((s) => ({ ...s, url }))}
                  placeholder={urlPlaceholder}
                />
                <SocialPreview
                  social={activeSocial}
                  url={formState.url.url}
                  encodedUrl={encodeResult.ok ? encodeResult.value : null}
                />
              </>
            )}
            {contentType === 'text' && (
              <TextForm value={formState.text} onChange={(text) => setFormState((s) => ({ ...s, text }))} />
            )}
            {contentType === 'phone' && (
              <PhoneForm value={formState.phone} onChange={(phone) => setFormState((s) => ({ ...s, phone }))} />
            )}
            {contentType === 'email' && (
              <EmailForm value={formState.email} onChange={(email) => setFormState((s) => ({ ...s, email }))} />
            )}
            {contentType === 'wifi' && (
              <WifiForm value={formState.wifi} onChange={(wifi) => setFormState((s) => ({ ...s, wifi }))} />
            )}
            {contentType === 'whatsapp' && (
              <WhatsappForm
                value={formState.whatsapp}
                onChange={(whatsapp) => setFormState((s) => ({ ...s, whatsapp }))}
              />
            )}
            {contentType === 'vcard' && (
              <VCardForm value={formState.vcard} onChange={(vcard) => setFormState((s) => ({ ...s, vcard }))} />
            )}
          </div>

          <ContentSummary result={encodeResult} />
        </section>

        {/* Panel Derecho: Vista Previa y Acciones */}
        <section className="app-preview-panel">
          <div className="app-preview-container">
            <QrPreview
              ref={qrPreviewRef}
              data={isQrReady ? encodeResult.value : null}
              style={qrStyle}
              errorCorrectionLevel={errorCorrectionLevel}
              logoImage={logo}
            />
            
            {isQrReady ? (
              <>
                <DownloadButtons 
                  disabled={!isQrReady} 
                  onDownload={handleDownload} 
                />
                {downloadFeedback && (
                  <span className="download-feedback">{downloadFeedback}</span>
                )}
              </>
            ) : (
              <p className="app-preview-hint">✏️ Completa el formulario para generar el QR</p>
            )}
          </div>

          {/* Opciones de personalización (colapsables) */}
          {isQrReady && (
            <div className="app-preview-options">
              <DesignWarnings
                encodedValue={encodeResult.value}
                dotColor={primaryDotColor(qrStyle)}
                backgroundColor={qrStyle.backgroundColor}
                hasLogo={logo !== null}
                errorCorrectionLevel={errorCorrectionLevel}
              />

              <DesignAccordion title="🎨 Personalizar diseño">
                <TemplateSelector value={templateId} onChange={setTemplateId} />
                <DesignOptions
                  showColorPickers={templateId === CUSTOM_TEMPLATE_ID}
                  dotColor={dotColor}
                  backgroundColor={backgroundColor}
                  errorCorrectionLevel={errorCorrectionLevel}
                  onDotColorChange={(value) => {
                    setDotColor(value);
                    setTemplateId(CUSTOM_TEMPLATE_ID);
                  }}
                  onBackgroundColorChange={(value) => {
                    setBackgroundColor(value);
                    setTemplateId(CUSTOM_TEMPLATE_ID);
                  }}
                  onErrorCorrectionLevelChange={setErrorCorrectionLevel}
                />
              </DesignAccordion>

              <DesignAccordion title="🖼️ Agregar logo">
                <LogoOptions logo={logo} onLogoChange={setLogo} />
              </DesignAccordion>
            </div>
          )}
        </section>
      </main>

      <LandingIntro />

      <footer className="app-footer">
        <a href="https://github.com/JuanCarlosJimenezRoman/qr-generator" target="_blank" rel="noopener">
          Código abierto en GitHub
        </a>
        {' · '}
        <a href="/privacidad/">Privacidad</a>
      </footer>

      <Analytics />
    </div>
  );
}

export default App;