import React, { useState, useEffect } from 'react';
import './App.css';
import InputDialog from './components/InputDialog';
import Instruments from './components/Instruments';

function App() {
  const [showInputDialog, setShowInputDialog] = useState(false);
  const [displayMode, setDisplayMode] = useState('visual'); // 'visual' or 'text'
  const [instrumentData, setInstrumentData] = useState({
    altitude: 0,
    his: 0,
    adi: 0
  });
  const [connectionError, setConnectionError] = useState(false);

  // פונקציה לטעינת נתונים מהשרת
  const fetchLatestData = async () => {
    try {
      console.log('Fetching latest data from server...');
      const response = await fetch('http://localhost:5000/api/instruments/latest');
      console.log('Server response:', response);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Received data:', data);
        
        setInstrumentData({
          altitude: data.altitude || 0,
          his: data.his || 0,
          adi: data.adi || 0
        });
        
        setConnectionError(false);
      } else {
        console.error('Server returned error:', response.status);
        setConnectionError(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setConnectionError(true);
    }
  };

  // טעינת נתונים בעת טעינת האפליקציה
  useEffect(() => {
    fetchLatestData();
    
    // רענון נתונים כל 5 שניות
    const interval = setInterval(fetchLatestData, 5000);
    return () => clearInterval(interval);
  }, []);

  // טיפול בשליחת נתונים חדשים
  const handleDataSubmit = async (newData) => {
    try {
      console.log('Submitting new data to server:', newData);
      
      const response = await fetch('http://localhost:5000/api/instruments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      console.log('Server response:', response);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Server returned:', data);
        
        // Update the instrument data with the values we just submitted
        setInstrumentData({
          altitude: data.altitude,
          his: data.his,
          adi: data.adi
        });
        
        setShowInputDialog(false);
        setConnectionError(false);
      } else {
        const errorData = await response.json();
        alert(`שגיאה: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('שגיאה בשליחת הנתונים - האם השרת פועל?');
      setConnectionError(true);
    }
  };

  // הסרת הדיאלוג במידה ואין שרת זמין לנתונים
  const handleManualUpdate = (newData) => {
    console.log('Manually updating data:', newData);
    setInstrumentData(newData);
    setShowInputDialog(false);
  };

  return (
    <div className="app">
      <div className="header">
        <button 
          className={`mode-btn ${displayMode === 'text' ? 'active' : ''}`} 
          onClick={() => setDisplayMode('text')}
        >
          TEXT
        </button>
        <button 
          className={`mode-btn ${displayMode === 'visual' ? 'active' : ''}`} 
          onClick={() => setDisplayMode('visual')}
        >
          VISUAL
        </button>
        <button className="add-btn" onClick={() => setShowInputDialog(true)}>+</button>
      </div>
      
      
      
      <Instruments 
        data={instrumentData} 
        displayMode={displayMode} 
      />
      
      {showInputDialog && (
        <InputDialog 
          onSubmit={connectionError ? handleManualUpdate : handleDataSubmit} 
          onClose={() => setShowInputDialog(false)} 
          initialData={instrumentData}
          offlineMode={connectionError}
        />
      )}
    </div>
  );
}

export default App;