// src/components/DesignAccordion.tsx
import { useState, type ReactNode } from 'react';

interface DesignAccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function DesignAccordion({ title, children, defaultOpen = false }: DesignAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="design-accordion">
      <button
        className="design-accordion-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        type="button"
      >
        <span>{title}</span>
        <span className={`design-accordion-icon ${isOpen ? 'is-open' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="design-accordion-content">
          {children}
        </div>
      )}
    </div>
  );
}