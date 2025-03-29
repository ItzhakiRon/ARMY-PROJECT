import React from 'react';
import './HisGauge.css';

function HisGauge({ value }) {
  // חישוב הסיבוב בהתאם לערך
  const rotation = value;
  
  return (
    <div className="his-gauge">
      <div className="his-circle">
        <div className="his-dial">
          {[0, 90, 180, 270].map(degree => (
            <div 
              key={degree} 
              className="his-mark" 
              style={{ transform: `rotate(${degree}deg) translateY(-75px) rotate(-${degree}deg)` }}
            >
              {degree}°
            </div>
          ))}
        </div>
        
        <div 
          className="his-pointer" 
          style={{ transform: `translate(-50%, -100%) rotate(${rotation}deg)` }}
        ></div>
        
        <div className="his-center-point"></div>
        <div className="his-fixed-arrow"></div>
      </div>
      
      <div className="his-display">
        <span>{value}°</span>
      </div>
    </div>
  );
}

export default HisGauge;