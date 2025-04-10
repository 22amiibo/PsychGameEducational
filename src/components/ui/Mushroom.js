import React from 'react';

// Functional component for rendering a mushroom icon.
// The appearance changes based on the 'active' prop.
function Mushroom({ active }) {
  return (
    <div className={`mushroom ${active ? 'active' : ''}`}>
      <div className="mushroom-cap"></div>
      <div className="mushroom-stem"></div>
    </div>
  ); 
}

export default Mushroom;