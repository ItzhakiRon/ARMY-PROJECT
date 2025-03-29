import React from 'react';
import './AltitudeGauge.css';

function AltitudeGauge({ value }) {
  // חישוב האחוז מתוך הטווח המלא
  const percentage = (value / 3000) * 100;
  
  return (
    <div className="altitude-gauge">
      <div className="altitude-scale">
        {[0, 500, 1000, 1500, 2000, 2500, 3000].map(tick => (
          <div key={tick} className="altitude-tick">
            <span className="altitude-tick-label">{tick}</span>
          </div>
        ))}
      </div>
      
      <div className="altitude-indicator" style={{ bottom: `${percentage}%` }}>
        <div className="altitude-needle"></div>
      </div>
      
      <div className="altitude-display">
        <span>{value} ft</span>
      </div>
    </div>
  );
}

export default AltitudeGauge;