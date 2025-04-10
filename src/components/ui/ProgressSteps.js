import React from 'react';

const ProgressSteps = ({ level }) => {
  return (
    <div className="progress-step">
      <div className={`step-indicator ${level >= 1 ? 'completed' : ''}`}>1</div>
      <div className="step-connector"></div>
      <div className={`step-indicator ${level >= 2 ? 'completed' : ''}`}>2</div>
      <div className="step-connector"></div>
      <div className={`step-indicator ${level >= 3 ? 'completed' : ''}`}>3</div>
    </div>
  );
};

export default ProgressSteps;

