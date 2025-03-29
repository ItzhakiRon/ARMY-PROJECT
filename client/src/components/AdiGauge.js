import React from 'react';
import './AdiGauge.css';

function AdiGauge({ value }) {
  // חישוב צבע המילוי בהתאם לערך
  // כחול ב-100, ירוק ב-0, וגרדיאנט ביניהם
  let backgroundColor;
  
  if (value === 0) {
    backgroundColor = '#4CAF50'; // All green
  } else if (value === 100) {
    backgroundColor = '#2196F3'; // All blue
  } else {
    // Original gradient logic for other values
    const bluePercentage = ((value + 100) / 200) * 100;
    backgroundColor = `linear-gradient(to top, 
      #4CAF50 0%, 
      #4CAF50 ${100 - bluePercentage}%, 
      #2196F3 ${100 - bluePercentage}%, 
      #2196F3 100%)`;
  }
  
  return (
    <div className="adi-gauge">
      <div 
        className="adi-circle" 
        style={{ background: backgroundColor }}
      >
        <div className="adi-display">
          <span>{value}</span>
        </div>
      </div>
    </div>
  );
}

export default AdiGauge;