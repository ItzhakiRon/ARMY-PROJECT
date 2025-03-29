import React from 'react';
import '../styles/TextDisplay.css';

const TextDisplay = ({ flightData }) => {
  const { altitude, his, adi } = flightData;
  
  return (
    <div className="text-display">
      <div className="data-item">
        <h3>Altitude:</h3>
        <p>{altitude} feet</p>
      </div>
      <div className="data-item">
        <h3>HIS (Heading):</h3>
        <p>{his}°</p>
      </div>
      <div className="data-item">
        <h3>ADI (Attitude):</h3>
        <p>{adi}</p>
      </div>
    </div>
  );
};

export default TextDisplay;