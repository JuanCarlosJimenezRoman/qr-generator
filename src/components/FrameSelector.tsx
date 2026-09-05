// src/components/FrameSelector.tsx
import { useState } from 'react';
import { FRAME_TEMPLATES, FRAME_CATEGORIES, type FrameTemplate } from '../content/frames';

interface FrameSelectorProps {
  selectedId: string;
  onSelect: (frame: FrameTemplate) => void;
}

export function FrameSelector({ selectedId, onSelect }: FrameSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<string>('standard');

  const filteredFrames = FRAME_TEMPLATES.filter(
    (frame) => frame.category === activeCategory
  );

  return (
    <div className="frame-selector">
      {/* Categorías */}
      <div className="frame-categories">
        {Object.entries(FRAME_CATEGORIES).map(([key, { label, icon }]) => (
          <button
            key={key}
            className={`frame-category-btn ${activeCategory === key ? 'is-active' : ''}`}
            onClick={() => setActiveCategory(key)}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* Grid de marcos */}
      <div className="frame-grid">
        {filteredFrames.map((frame) => (
          <button
            key={frame.id}
            className={`frame-item ${selectedId === frame.id ? 'is-selected' : ''}`}
            onClick={() => onSelect(frame)}
          >
            <img
              src={frame.svgPath}
              alt={frame.name}
              className="frame-thumbnail"
              style={{
                // Preview con colores por defecto
                filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.1))`
              }}
            />
            <span className="frame-name">{frame.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}