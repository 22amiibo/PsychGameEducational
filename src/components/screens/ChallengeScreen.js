import React from 'react';

/**
 * ChallengeScreen Component
 *
 * Renders the challenge screen where the player must overcome negative thought obstacles.
 *
 * @param {object} props - Component props.
 * @param {string} props.gameState - The current state of the game.
 * @param {string} props.message - The message to display on the screen.
 * @param {array} props.obstacles - An array of obstacle objects, each with an id, x, and y.
 * @param {function} props.handleObstacleClick - Function to call when an obstacle is clicked.
 * @returns {JSX.Element|null} The rendered ChallengeScreen component or null if not in the 'challenge' game state.
 */
const ChallengeScreen = ({ gameState, message, obstacles, handleObstacleClick }) => {
    // Only render the component if the game state is 'challenge'
    if (gameState !== 'challenge') return null;

    return (
        <div className="challenge-screen">
            <h2>Overcome Negative Patterns</h2>
            <p>{message}</p>
            <div className="obstacles-container">
                {obstacles.map(obstacle => (
                    <div
                        key={obstacle.id}
                        className="obstacle"
                        style={{ left: `${obstacle.x}%`, top: `${obstacle.y}%` }}
                        onClick={() => handleObstacleClick(obstacle.id)}
                    ></div>
                ))}
            </div>
            <p>{obstacles.length === 0 ? "Challenge complete! Moving to new insights." : "Clear all obstacles to proceed."}</p>
        </div>
    );
};

export default ChallengeScreen;