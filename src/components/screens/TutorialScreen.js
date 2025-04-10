import React from 'react';
import BrainNetwork from '../BrainNetwork';
import Mushroom from '../ui/Mushroom';

/**
 * TutorialScreen Component
 *
 * Renders the tutorial screen based on the current tutorial step.
 *
 * @param {object} props - The component props.
 * @param {number} props.tutorialStep - The current tutorial step number.
 * @param {string} props.message - The message to display for the current step.
 * @param {function} props.nextTutorialStep - Function to call when the "Next" button is clicked.
 */
const TutorialScreen = ({ tutorialStep, message, nextTutorialStep }) => {
  return (
    <div className="tutorial-screen">
      <h2>Tutorial: Step {tutorialStep} of 5</h2>
      <p>{message}</p>
      <div className="tutorial-visual">
        {/* Render BrainNetwork for tutorial step 1 */}
        {tutorialStep === 1 && <BrainNetwork />}
        
        {/* Render Mushroom and BrainNetwork for tutorial step 2 */}
        {tutorialStep === 2 && (
          <div className="tutorial-dmt">
            <Mushroom active={true} />
            <div className="tutorial-brain">
              <BrainNetwork />
            </div>
          </div>
        )}

        {/* Render thought pattern example for tutorial step 3 */}
        {tutorialStep === 3 && (
          <div className="tutorial-insights">
            <div className="thought-pattern">I need a cigarette to relax</div>
            <div className="arrow-down">↓</div>
            <div className="new-perspective">I can find healthier ways to relax</div>
          </div>
        )}

        {/* Render bad trip example for tutorial step 4 */}
        {tutorialStep === 4 && (
          <div className="tutorial-badtrip">
            <div className="bad-trip-icon">⚠️</div>
            <button className="calm-button">Calm Patient</button>
          </div>
        )}

        {/* Render eureka example for tutorial step 5 */}
        {tutorialStep === 5 && (
          <div className="tutorial-eureka">
            <div className="eureka-icon">💡</div>
            <div className="tutorial-text">Click quickly!</div>
          </div>
        )}
      </div>
      {/* Render the Next/Start Therapy button */}
      <button onClick={nextTutorialStep} className="main-button">
        {tutorialStep < 5 ? "Next" : "Start Therapy"}
      </button>
    </div>
  );
};

export default TutorialScreen;