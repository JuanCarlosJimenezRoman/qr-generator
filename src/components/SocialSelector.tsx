import type { CSSProperties } from 'react';
import { SOCIAL_TEMPLATES, type SocialTemplate } from '../content/socialTemplates';

interface SocialSelectorProps {
  activeId: string | null;
  onSelect: (social: SocialTemplate) => void;
}

export function SocialSelector({ activeId, onSelect }: SocialSelectorProps) {
  return (
    <div className="social-selector">
      <span className="social-selector-label">Acceso rápido: redes sociales</span>
      <div className="social-selector-grid" role="group" aria-label="Plantilla de red social">
        {SOCIAL_TEMPLATES.map((social) => {
          const isActive = activeId === social.id;
          return (
            <button
              key={social.id}
              type="button"
              aria-pressed={isActive}
              className={`social-selector-btn${isActive ? ' is-active' : ''}`}
              style={{ '--brand-color': social.brandColor } as CSSProperties}
              onClick={() => onSelect(social)}
              title={`Usar la plantilla de ${social.label}`}
            >
              <span className="social-selector-icon" aria-hidden="true">
                {social.icon}
              </span>
              <span className="social-selector-name">{social.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
