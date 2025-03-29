import React from 'react';
import '../../styles/gauges/AdiGauge.css';

const AdiGauge = ({ value }) => {
  // מחשב את היחס בין האזור הכחול (שמיים) לירוק (אדמה)
  const blueHeightPercentage = ((value + 100) / 200) * 100;
  
  return (
    <div className="adi-gauge gauge">
      <h3>ADI (Attitude)</h3>
      <div className="gauge-container">
        <div className="horizon-container">
          <div 
            className="sky"
            style={{ height: `${blueHeightPercentage}%` }}
          ></div>
          <div 
            className="ground"
            style={{ height: `${100 - blueHeightPercentage}%` }}
          ></div>
          <div className="center-line"></div>
        </div>
      </div>
      <div className="value-display">{Math.round(value)}</div>
    </div>
  );
};

export default AdiGauge;