import React from 'react';

// BadTripScreen component: Displays the screen for a challenging experience.
// Props:
//   - message: The message to display to the user.
//   - handleBadTripAction: Function to call when the "Provide Reassurance" button is clicked.
const BadTripScreen = ({ message, handleBadTripAction }) => {
  return (
    <div className="bad-trip-screen">
      <h2>Challenging Experience</h2>
      <p>{message}</p>
      <div className="calm-down-container">
        {/* Meter to visually represent the "calming down" process.  Currently not dynamically filled. */}
        <div className="bad-trip-meter">
          <div className="meter-fill"></div>
        </div>
        <button className="calm-button" onClick={handleBadTripAction}>
          Provide Reassurance
        </button>
        {/* Additional UI elements (e.g., tips) could be added here */}
      </div>
    </div>
  );
};

export default BadTripScreen;