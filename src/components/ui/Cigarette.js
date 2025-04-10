import React from 'react';

/**
 * Cigarette Component
 * Represents a cigarette with different states based on props.
 */
const Cigarette = ({ burning, crossed, fading }) => {
  return (
    <div className={`cigarette ${burning ? 'burning' : ''} ${crossed ? 'crossed' : ''} ${fading ? 'fading' : ''}`} />
  );
};

export default Cigarette;