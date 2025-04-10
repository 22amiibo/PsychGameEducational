import React from 'react';

/**
 * IntroScreen component displays the welcome screen with options to start the tutorial or skip to therapy.
 *
 * @param {object} props - The component's props.
 * @param {function} props.startTutorial - Function to start the tutorial.
 * @param {function} props.startTherapy - Function to skip to the therapy session.
 */
const IntroScreen = ({ startTutorial, startTherapy }) => {
  return (
    <div className="intro-screen">
      {/* Welcome heading */}
      <h2>Welcome to Psilocybin Therapy Simulator</h2>
      {/* Description paragraph */}
      <p>Explore the neuroscience behind psilocybin-assisted addiction therapy.</p>
      {/* Role description paragraph */}
      <p>Your role: Guide patients through transformative sessions to reshape thought patterns.</p>
      {/* Button row for starting tutorial or therapy */}
      <div className="button-row">
        {/* Start Tutorial button */}
        <button onClick={startTutorial} className="main-button">Start Tutorial</button>
        {/* Skip to Therapy button */}
        <button onClick={startTherapy} className="secondary-button">Skip to Therapy</button>
      </div>
    </div>
  );
};

export default IntroScreen;