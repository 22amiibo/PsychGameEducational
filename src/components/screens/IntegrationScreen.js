import React from 'react';
import BrainNetwork from '../BrainNetwork';

// IntegrationScreen: Displays the integration phase of the therapy.
// Shows progress summary and a button to continue or complete treatment.
const IntegrationScreen = ({ message, thoughtPatterns, newPerspectives, defaultNetworkActivity, level, integrateExperience }) => {
  return (
    <div className="integration-screen">
      <h2>Integration Phase</h2>
      <p>{message}</p>

      <div className="integration-visual">
        <div className="brain-changes">
          <BrainNetwork />
        </div>

        <div className="progress-summary">
          {/* Displays the reduction in addiction strength */}
          <div className="summary-item">
            <div className="summary-label">Addiction Strength Reduced:</div>
            <div className="summary-value">
              {/* Calculates the average reduction in thought pattern strength */}
              {Math.round(
                100 - thoughtPatterns.reduce((sum, p) => sum + p.strength, 0) / thoughtPatterns.length
              )}%
            </div>
          </div>

          {/* Displays the progress in gaining new perspectives */}
          <div className="summary-item">
            <div className="summary-label">New Perspectives Gained:</div>
            <div className="summary-value">
              {/* Calculates the average strength of new perspectives */}
              {Math.round(
                newPerspectives.reduce((sum, p) => sum + p.strength, 0) / newPerspectives.length
              )}%
            </div>
          </div>

          {/* Displays the improvement in Default Mode Network (DMN) flexibility */}
          <div className="summary-item">
            <div className="summary-label">DMN Flexibility:</div>
            <div className="summary-value">
              {/* Calculates the percentage improvement in DMN flexibility */}
              {Math.round(100 - defaultNetworkActivity)}%
            </div>
          </div>
        </div>
      </div>

      {/* Button to continue to the next session or complete treatment */}
      <button onClick={integrateExperience} className="main-button">
        {/* Text changes based on the current level */}
        {level < 3 ? 'Continue to Next Session' : 'Complete Treatment'}
      </button>
    </div>
  );
};

export default IntegrationScreen;