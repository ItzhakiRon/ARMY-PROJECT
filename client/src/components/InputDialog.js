import React, { useState } from 'react';
import './InputDialog.css';

function InputDialog({ onSubmit, onClose, initialData, offlineMode }) {
  const [formData, setFormData] = useState(initialData || {
    altitude: 0,
    his: 0,
    adi: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="input-dialog-overlay">
      <div className="input-dialog">
        <h3>הזנת נתוני טיסה</h3>
        
        
        
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <label>Altitude</label>
            <input
              type="number"
              name="altitude"
              min="0"
              max="3000"
              value={formData.altitude}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-row">
            <label>HIS</label>
            <input
              type="number"
              name="his"
              min="0"
              max="360"
              value={formData.his}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-row">
            <label>ADI</label>
            <input
              type="number"
              name="adi"
              min="-100"
              max="100"
              value={formData.adi}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="button-row">
            <button type="button" onClick={onClose} className="cancel-btn">ביטול</button>
            <button type="submit" className="send-btn">שלח</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InputDialog;