import { QrPreview } from './QrPreview';
import { encodeContent } from '../content/types';
import { CUSTOM_TEMPLATE_ID, resolveQrStyle } from '../content/templates';

// Estilo simple y consistente para los tres ejemplos: no queremos que
// compitan visualmente con el QR "real" que arma el usuario arriba.
const EXAMPLE_STYLE = resolveQrStyle(CUSTOM_TEMPLATE_ID, {
  dotColor: '#2563eb',
  backgroundColor: '#ffffff',
});

interface LandingExample {
  key: string;
  title: string;
  description: string;
  href: string;
  data: string | null;
}

function buildExamples(): LandingExample[] {
  const wifi = encodeContent({
    type: 'wifi',
    data: { ssid: 'Cafeteria-Invitados', password: 'bienvenido2024', security: 'WPA', hidden: false },
  });
  const whatsapp = encodeContent({
    type: 'whatsapp',
    data: { phone: '+525512345678', message: 'Hola, vi su QR y quiero más información' },
  });
  const vcard = encodeContent({
    type: 'vcard',
    data: {
      fullName: 'Ana Torres',
      organization: 'Estudio Creativo',
      title: 'Diseñadora',
      phone: '+525587654321',
      email: 'ana@ejemplo.com',
      url: '',
    },
  });

  return [
    {
      key: 'wifi',
      title: 'QR para WiFi',
      description: 'Tus invitados se conectan al escanear, sin ver la contraseña.',
      href: '/guias/qr-wifi/',
      data: wifi.ok ? wifi.value : null,
    },
    {
      key: 'whatsapp',
      title: 'QR para WhatsApp',
      description: 'Abre un chat con tu número y un mensaje ya escrito.',
      href: '/guias/qr-whatsapp-business/',
      data: whatsapp.ok ? whatsapp.value : null,
    },
    {
      key: 'vcard',
      title: 'QR de tarjeta digital (vCard)',
      description: 'Guarda tus datos directo en los contactos del celular.',
      href: '/guias/qr-vcard-tarjeta-digital/',
      data: vcard.ok ? vcard.value : null,
    },
  ];
}

const EXAMPLES = buildExamples();

export function LandingIntro() {
  return (
    <section className="landing-intro" aria-labelledby="landing-intro-title">
      <h2 id="landing-intro-title">Generador QR gratis, sin registro y privado</h2>
      <p className="landing-intro-lead">
        Crea códigos QR para enlaces, WiFi, WhatsApp, vCard, email y más. Todo se genera en tu
        navegador: no hay cuentas, ni límites, ni tus datos pasando por un servidor.
      </p>

      <div className="landing-examples">
        {EXAMPLES.map((example) => (
          <a key={example.key} className="landing-example" href={example.href}>
            <QrPreview data={example.data} style={EXAMPLE_STYLE} size={112} />
            <span className="landing-example-title">{example.title}</span>
            <span className="landing-example-desc">{example.description}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
