import React from 'react';
import Cigarette from '../ui/Cigarette';

/**
 * ResultsScreen Component
 *
 * Displays the results of the psilocybin therapy simulation.
 * Shows the change in thought patterns, new perspectives gained, and the final score.
 *
 * @param {object[]} thoughtPatterns - Array of current thought patterns.
 * @param {object[]} initialThoughtPatterns - Array of initial thought patterns.
 * @param {object[]} newPerspectives - Array of new perspectives gained.
 * @param {number} score - The final score achieved in the simulation.
 * @param {function} resetGame - Function to reset the game to its initial state.
 */
const ResultsScreen = ({ thoughtPatterns, initialThoughtPatterns, newPerspectives, score, resetGame }) => {
  return (
    <div className="results-screen">
      <div className="results-comparison">
        <h2>Results: Before vs. After Treatment</h2>
        {initialThoughtPatterns.map(initialPattern => {
          const finalPattern = thoughtPatterns.find(p => p.id === initialPattern.id);
          return (
            <div key={initialPattern.id} className="comparison-row">
              <div className="pattern-text">{initialPattern.text}</div>
              <div className="comparison-values">
                <span className="before-value">Before: {initialPattern.strength}%</span>
                <span className="arrow">→</span>
                <span className="after-value">After: {finalPattern ? finalPattern.strength : 0}%</span>
              </div>
            </div>
          );
        })}
      </div>
      <h2>Treatment Results</h2>
      <div className="final-score">
        <div className="score-label">Final Score:</div>
        <div className="score-value">{score}</div>
      </div>
      <div className="results-summary">
        <div className="results-comparison">
          <h3>Thought Pattern Progress</h3>
          {initialThoughtPatterns.map(initialP => {
            const finalP = thoughtPatterns.find(fp => fp.id === initialP.id);
            return (
              <div key={initialP.id} className="comparison-row">
                <div className="comparison-pattern">
                  <div>{initialP.text}</div>
                  <div className="before-after">
                    <span className="before-value">{initialP.strength}%</span>
                    <span className="arrow">→</span>
                    <span className="after-value">{finalP ? finalP.strength : 0}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <h3>New Perspectives:</h3>
        <div className="pattern-cards small">
          {newPerspectives.map(insight => (
            <div key={insight.id} className="pattern-card">
              <div className="card-text">{insight.text}</div>
              <div className="strength-meter">
                <div className={`strength-fill ${insight.color}`} style={{ width: `${insight.strength}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="educational-summary">
        <h3>About Psilocybin Therapy</h3>
        <p>Research suggests that psilocybin-assisted therapy can help treat addiction by:</p>
        <ul>
          <li>Temporarily reducing DMN activity to allow new connections</li>
          <li>Enabling patients to gain fresh perspectives on their addiction</li>
          <li>Creating opportunities for lasting insight and change</li>
          <li>Providing emotional breakthroughs that alter entrenched patterns</li>
        </ul>
        <p>This simulation is an educational tool—real therapy should be conducted by licensed professionals.</p>
      </div>
      <div className="button-row">
        <button onClick={resetGame} className="main-button">Play Again</button>
      </div>
    </div>
  );
};

export default ResultsScreen;