import React, { useState } from 'react';
import '../styles/DataInput.css';
import { sendFlightData } from '../services/api';

const DataInput = ({ onDataSubmit }) => {
  const [formData, setFormData] = useState({
    altitude: '',
    his: '',
    adi: ''
  });
  
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateData = () => {
    const { altitude, his, adi } = formData;
    
    if (!altitude || !his || !adi) {
      setError('כל השדות הם חובה');
      return false;
    }
    
    const altitudeNum = Number(altitude);
    const hisNum = Number(his);
    const adiNum = Number(adi);
    
    if (isNaN(altitudeNum) || altitudeNum < 0 || altitudeNum > 3000) {
      setError('גובה חייב להיות מספר בין 0 ל-3000');
      return false;
    }
    
    if (isNaN(hisNum) || hisNum < 0 || hisNum > 360) {
      setError('HIS חייב להיות מספר בין 0 ל-360');
      return false;
    }
    
    if (isNaN(adiNum) || adiNum < -100 || adiNum > 100) {
      setError('ADI חייב להיות מספר בין -100 ל-100');
      return false;
    }
    
    setError('');
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateData()) {
      return;
    }
    
    try {
      const data = {
        altitude: Number(formData.altitude),
        his: Number(formData.his),
        adi: Number(formData.adi)
      };
      
      const response = await sendFlightData(data);
      onDataSubmit(response);
    } catch (error) {
      setError('שגיאה בשליחת הנתונים. אנא נסה שוב.');
      console.error('Error sending data:', error);
    }
  };
  
  return (
    <div className="data-input">
      <form onSubmit={handleSubmit}>
        <h2>הזנת נתונים</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="input-group">
          <label>Altitude</label>
          <input 
            type="number"
            name="altitude"
            value={formData.altitude}
            onChange={handleChange}
            placeholder="0-3000"
          />
        </div>
        
        <div className="input-group">
          <label>HIS</label>
          <input 
            type="number"
            name="his"
            value={formData.his}
            onChange={handleChange}
            placeholder="0-360"
          />
        </div>
        
        <div className="input-group">
          <label>ADI</label>
          <input 
            type="number"
            name="adi"
            value={formData.adi}
            onChange={handleChange}
            placeholder="-100-100"
          />
        </div>
        
        <button type="submit" className="send-button">
          <span className="arrow">➤</span>
        </button>
      </form>
    </div>
  );
};

export default DataInput;