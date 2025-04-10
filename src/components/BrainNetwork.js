import React from 'react';

// BrainNetwork Component
// Renders a visual representation of brain network connections.
// Props:
//   - activeConnections: An array of connection objects, each with:
//     - id: Unique identifier for the connection.
//     - x1, y1: Starting coordinates of the connection (percentage).
//     - x2, y2: Ending coordinates of the connection (percentage).
//     - active: Boolean indicating if the connection is currently active.
//   - visualTheme: String representing the current visual theme ('default', 'calm', 'intense').
const BrainNetwork = ({ activeConnections, visualTheme }) => {
  return (
    <div className={`brain-container theme-${visualTheme}`}>
      {activeConnections.map(conn => (
        <Fragment key={conn.id}>
          <div
            className={`connection ${conn.active ? "active-connection" : ""}`}
            style={{
              left: `${conn.x1}%`,
              top: `${conn.y1}%`,
              width: `${Math.sqrt(Math.pow(conn.x2 - conn.x1, 2) + Math.pow(conn.y2 - conn.y1, 2))}%`,
              transform: `rotate(${Math.atan2(conn.y2 - conn.y1, conn.x2 - conn.x1)}rad)`,
            }}
          ></div>
          <div
            className={`node ${conn.active ? "active-node" : ""}`}
            style={{ left: `${conn.x1}%`, top: `${conn.y1}%` }}
          ></div>
          <div className={`node ${conn.active ? "active-node" : ""}`} style={{ left: `${conn.x2}%`, top: `${conn.y2}%` }}></div>
        </Fragment>
      ))}
    </div>
  );
};

export default BrainNetwork;