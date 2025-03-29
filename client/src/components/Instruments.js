import React from 'react';
import './Instruments.css';
import AltitudeGauge from './AltitudeGauge';
import HisGauge from './HisGauge';
import AdiGauge from './AdiGauge';

function Instruments({ data, displayMode }) {
  return (
    <div className="instruments-container">
      {displayMode === 'visual' ? (
        <div className="visual-instruments">
          <AltitudeGauge value={data.altitude} />
          <HisGauge value={data.his} />
          <AdiGauge value={data.adi} />
        </div>
      ) : (
        <div className="text-instruments">
          <div className="text-gauge">
            <div className="gauge-label">Altitude</div>
            <div className="gauge-value">{data.altitude}</div>
          </div>
          <div className="text-gauge">
            <div className="gauge-label">HIS</div>
            <div className="gauge-value">{data.his}</div>
          </div>
          <div className="text-gauge">
            <div className="gauge-label">ADI</div>
            <div className="gauge-value">{data.adi}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Instruments;