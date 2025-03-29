import React from 'react';
import '../styles/Dashboard.css';
import AltitudeGauge from './gauges/AltitudeGauge';
import HisGauge from './gauges/HisGauge';
import AdiGauge from './gauges/AdiGauge';
import TextDisplay from './TextDisplay';

const Dashboard = ({ flightData, displayMode }) => {
  const { altitude, his, adi } = flightData;
  
  return (
    <div className="dashboard">
      {displayMode === 'visual' ? (
        <div className="gauges-container">
          <AltitudeGauge value={altitude} />
          <HisGauge value={his} />
          <AdiGauge value={adi} />
        </div>
      ) : (
        <TextDisplay flightData={flightData} />
      )}
    </div>
  );
};

export default Dashboard;