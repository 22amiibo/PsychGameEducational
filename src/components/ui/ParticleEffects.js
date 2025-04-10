// src/components/ui/ParticleEffects.js
import React from 'react';

/**
 * ParticleEffects Component
 *
 * Renders a container for displaying particle effects. It maps over an array of
 * particle objects and renders each particle with its specified properties.
 *
 * @component
 * @returns {JSX.Element} The rendered ParticleEffects component.
 */
const ParticleEffects = ({ particleEffects }) => (
  <div className="particle-container">
    {particleEffects.map(particle => (
      <div
        key={particle.id}
        className="particle"
        style={{ left: `${particle.x}%`, top: `${particle.y}%`, background: particle.color, width: `${particle.size}px`, height: `${particle.size}px` }}
      />
    ))}
  </div>
);

export default ParticleEffects;