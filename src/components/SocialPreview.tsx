import { extractHandle, type SocialTemplate } from '../content/socialTemplates';

interface SocialPreviewProps {
  social: SocialTemplate | null;
  url: string;
  encodedUrl: string | null;
}

/**
 * Muestra qué red y (si se puede leer de la URL ya escrita) qué usuario se
 * va a codificar. Es 100% local: el "usuario detectado" se lee directamente
 * del texto que el usuario ya escribió en el campo, sin contactar ninguna
 * API ni red social — no descarga foto, nombre ni biografía de nadie.
 */
export function SocialPreview({ social, url, encodedUrl }: SocialPreviewProps) {
  if (!social) return null;

  const handle = extractHandle(url);

  return (
    <p className="social-preview" aria-live="polite">
      <span aria-hidden="true">{social.icon}</span>{' '}
      {handle ? (
        <>
          {social.label} · <strong>@{handle}</strong>
        </>
      ) : (
        <>Escribe tu usuario o enlace de {social.label} arriba.</>
      )}
      {encodedUrl && (
        <>
          {' — '}
          <a href={encodedUrl} target="_blank" rel="noopener noreferrer">
            abrir enlace ↗
          </a>
        </>
      )}
    </p>
  );
}
