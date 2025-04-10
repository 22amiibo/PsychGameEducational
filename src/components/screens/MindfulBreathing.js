// src/components/screens/MindfulBreathing.js
import React, { useState, useEffect } from 'react';
import './MindfulBreathing.css'; // Import the CSS file

function MindfulBreathing() {
  const [isBreathingIn, setIsBreathingIn] = useState(false); // Track if player is inhaling
  const [circleSize, setCircleSize] = useState(50); // Size of the circle (starts at 50)
  const [isSynced, setIsSynced] = useState('out'); // synced states: 'synced', 'partially', 'out'
  const [message, setMessage] = useState(''); // message to the player

  useEffect(() => {
    // Placeholder for the breathing animation and synchronization logic
    const interval = setInterval(() => {
      setCircleSize(prevSize => (isBreathingIn ? prevSize + 1 : prevSize - 1));
    }, 50); // Adjust timing as needed

    return () => clearInterval(interval);
  }, [isBreathingIn]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        setIsBreathingIn(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === 'Space') {
        setIsBreathingIn(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle synching
  useEffect(() => {
    const timer = setTimeout(() => {
      if (circleSize > 70 && circleSize < 90) {
        setIsSynced('partially');
        setMessage('Partially Synched!');
      } else if (circleSize >= 90) {
        setIsSynced('synced');
        setMessage('Synched!');
      } else {
        setIsSynced('out');
        setMessage('Out of synch');
      }
    }, 100); // Adjust as needed to change the timing

    return () => clearTimeout(timer);
  }, [circleSize]);

  return (
    <div className="mindful-breathing-container">
      <div
        className={`breathing-circle ${isSynced}`}
        style={{
          width: `${circleSize}px`,
          height: `${circleSize}px`,
        }}
      />
      <p className="sync-message">{message}</p>
    </div>
  );
}

export default MindfulBreathing;