import React from 'react';
import '../../styles/gauges/HisGauge.css';

const HisGauge = ({ value }) => {
  // מחשב את הזווית של המחוון
  const rotation = value;
  
  return (
    <div className="his-gauge gauge">
      <h3>HIS (Heading)</h3>
      <div className="gauge-container">
        <div className="compass-face">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(degree => (
            <div 
              key={degree} 
              className="degree-mark" 
              style={{ transform: `rotate(${degree}deg)` }}
            >
              {degree % 90 === 0 && (
                <span className="cardinal-direction">
                  {degree === 0 ? 'N' : degree === 90 ? 'E' : degree === 180 ? 'S' : 'W'}
                </span>
              )}
            </div>
          ))}
          
          <div 
            className="compass-pointer"
            style={{ transform: `rotate(${rotation}deg)` }}
          ></div>
          
          <div className="center-point"></div>
        </div>
      </div>
      <div className="value-display">{Math.round(value)}°</div>
    </div>
  );
};

export default HisGauge;