import React from 'react';
import '../../styles/gauges/AltitudeGauge.css';

const AltitudeGauge = ({ value }) => {
  // מחשב את המיקום של המחוון בהתאם לגובה
  const pointerPosition = (value / 3000) * 100;
  
  return (
    <div className="altitude-gauge gauge">
      <h3>Altitude</h3>
      <div className="gauge-container">
        <div className="scale">
          {[0, 500, 1000, 1500, 2000, 2500, 3000].map(tick => (
            <div key={tick} className="tick">
              <span className="tick-label">{tick}</span>
            </div>
          ))}
        </div>
        <div 
          className="pointer"
          style={{ bottom: `${pointerPosition}%` }}
        ></div>
      </div>
      <div className="value-display">{Math.round(value)} ft</div>
    </div>
  );
};

export default AltitudeGauge;