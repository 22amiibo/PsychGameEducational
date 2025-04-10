// InsightsScreen.js
// This component renders the insights screen of the game, where the player interacts with new perspectives.

import React from 'react';
import BrainNetwork from '../BrainNetwork';

/**
 * @component InsightsScreen
 * Renders the insights screen with eureka moments, timer, and new perspectives.
 *
 * @param {object} props - Component props
 * @param {string} props.message - Message to display on the screen.
 * @param {boolean} props.eurekaActive - Indicates if a eureka moment is active.
 * @param {object} props.eurekaPosition - Position of the eureka moment icon.
 * @param {number} props.eurekaTimer - Timer for the eureka moment.
 * @param {function} props.captureEurekaMoment - Function to capture the eureka moment.
 * @param {number} props.timeRemaining - Remaining time for the insights phase.
 * @param {number} props.timeLimit - Total time limit for the insights phase.
 * @param {array} props.newPerspectives - Array of new perspective objects.
 * @param {function} props.processInsights - Function to process insights when clicked.
 */
const InsightsScreen = ({ 
    message, 
    eurekaActive, 
    eurekaPosition, 
    eurekaTimer, 
    captureEurekaMoment, 
    timeRemaining, 
    timeLimit, 
    newPerspectives, 
    processInsights 
}) => {
    return (
        <div className="insights-screen">
            <h2>Channel New Perspectives</h2>
            <p>{message}</p>

            {/* Eureka Moment Display */}
            {eurekaActive && (
                <div
                    className="eureka-moment"
                    style={{ left: `${eurekaPosition.x}%`, top: `${eurekaPosition.y}%` }}
                    onClick={captureEurekaMoment}
                >
                    <div className="eureka-icon">💡</div>
                    <div className="eureka-timer">{eurekaTimer}s</div>
                </div>
            )}

            {/* Timer Display */}
            <div className="timer-bar">
                <div className="timer-label">Time Remaining:</div>
                <div className="timer-container">
                    <div
                        className="timer-fill"
                        style={{ width: `${(timeRemaining / timeLimit) * 100}%` }}
                    ></div>
                </div>
                <div className="timer-value">{timeRemaining}s</div>
            </div>

            {/* New Perspectives Grid */}
            <div className="insight-container">
                <div className="insight-grid">
                    {newPerspectives.map(insight => (
                        <div
                            key={insight.id}
                            className={`insight-card ${insight.unlocked ? 'unlocked' : 'locked'}`}
                            data-id={insight.id}
                            onClick={() => insight.unlocked && processInsights(insight.id)}
                        >
                            <div className="card-text">{insight.text}</div>
                            <div className="strength-meter">
                                <div className={`strength-fill ${insight.color} trippy`} style={{ width: `${(insight.clicks / 10) * 100}%` }}></div>
                                <div className="click-count">Clicks: {insight.clicks}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="brain-mini"><BrainNetwork /></div>
        </div>
    );
};

export default InsightsScreen;