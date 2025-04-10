// src/components/screens/SessionScreen.js
// This component renders the main gameplay screen where the user conducts a psilocybin therapy session.
import React from 'react';
import BrainNetwork from '../BrainNetwork';
import Cigarette from '../ui/Cigarette';

/**
 * SessionScreen Component
 *
 * @param {object} props - Component props
 * @param {number} props.level - The current level of the game
 * @param {string} props.message - The current message to display to the user
 * @param {number} props.defaultNetworkActivity - The current activity level of the Default Mode Network (DMN)
 * @param {array} props.thoughtPatterns - An array of the patient's current thought patterns
 * @param {array} props.fadeOutPatterns - An array of thought pattern IDs that are currently fading out
 * @param {boolean} props.showBounce - Whether to show a bounce animation on the "Administer Psilocybin" button
 * @param {function} props.conductSession - Function to call when the user administers psilocybin
 * @returns {JSX.Element} - Rendered SessionScreen component
 */
const SessionScreen = ({ level, message, defaultNetworkActivity, thoughtPatterns, fadeOutPatterns, showBounce, conductSession }) => {
  return (
    <div className="session-screen">
      <h2>Psilocybin Session: Level {level}</h2>
      <p>{message}</p>

      {/* Brain Network Visualization */}
      <div className="brain-section">
        <BrainNetwork />
        <div className="dmn-meter">
          <div className="meter-label">Default Mode Network Activity</div>
          <div className="meter-container">
            <div className={`meter-fill ${defaultNetworkActivity > 70 ? 'high' : defaultNetworkActivity > 40 ? 'medium' : 'low'}`} style={{ width: `${defaultNetworkActivity}%` }}></div>
          </div>
        </div>
      </div>

      {/* Thought Patterns Display */}
      <div className="thought-patterns">
        <h3>Current Thought Patterns</h3>
        <div className="pattern-cards">
          {thoughtPatterns.map((pattern) => (
            <div key={pattern.id} className={`pattern-card ${fadeOutPatterns.includes(pattern.id) ? 'fading' : ''}`} data-id={pattern.id}>
              <div className="card-header">
                <Cigarette burning={pattern.strength > 50} crossed={pattern.strength < 30} fading={fadeOutPatterns.includes(pattern.id)} />
              </div>
              <div className="card-text">{pattern.text}</div>
              <div className="strength-meter">
                <div className={`strength-fill ${pattern.color}`} style={{ width: `${pattern.strength}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Administer Psilocybin Button */}
      <button onClick={conductSession} className={`main-button ${showBounce ? 'bounce' : ''}`}>Administer Psilocybin</button>
    </div>
  );
};

export default SessionScreen;