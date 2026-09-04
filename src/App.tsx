import { useMemo, useState } from 'react';
import './App.css';
import { ContentTypeSelector } from './components/ContentTypeSelector';
import { ContentSummary } from './components/ContentSummary';
import { QrPreview } from './components/QrPreview';
import { UrlForm } from './components/forms/UrlForm';
import { TextForm } from './components/forms/TextForm';
import { PhoneForm } from './components/forms/PhoneForm';
import { EmailForm } from './components/forms/EmailForm';
import { WifiForm } from './components/forms/WifiForm';
import { WhatsappForm } from './components/forms/WhatsappForm';
import { encodeContent, type ContentType } from './content/types';
import type { UrlInput } from './content/encoders/url';
import type { TextInput } from './content/encoders/text';
import type { PhoneInput } from './content/encoders/phone';
import type { EmailInput } from './content/encoders/email';
import type { WifiInput } from './content/encoders/wifi';
import type { WhatsappInput } from './content/encoders/whatsapp';

interface FormState {
  url: UrlInput;
  text: TextInput;
  phone: PhoneInput;
  email: EmailInput;
  wifi: WifiInput;
  whatsapp: WhatsappInput;
}

const DEFAULT_FORM_STATE: FormState = {
  url: { url: '' },
  text: { text: '' },
  phone: { phone: '' },
  email: { to: '', subject: '', body: '' },
  wifi: { ssid: '', password: '', security: 'WPA', hidden: false },
  whatsapp: { phone: '', message: '' },
};

function App() {
  const [contentType, setContentType] = useState<ContentType>('url');
  const [formState, setFormState] = useState<FormState>(DEFAULT_FORM_STATE);

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
    }
  }, [contentType, formState]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Generador de QR</h1>
        <p>Gratis, sin límites y sin conexión a ningún servidor: todo se genera en tu navegador.</p>
      </header>

      <main className="app-main">
        <section className="app-panel">
          <ContentTypeSelector value={contentType} onChange={setContentType} />

          <div className="app-form">
            {contentType === 'url' && (
              <UrlForm value={formState.url} onChange={(url) => setFormState((s) => ({ ...s, url }))} />
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
          </div>

          <ContentSummary result={encodeResult} />
        </section>

        <section className="app-preview">
          <QrPreview data={encodeResult.ok ? encodeResult.value : null} />
          {!encodeResult.ok && <p className="app-preview-hint">Completa el formulario para generar el QR.</p>}
        </section>
      </main>
    </div>
  );
}

export default App;
