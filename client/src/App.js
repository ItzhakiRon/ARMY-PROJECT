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

  // פונקציה לטעינת נתונים מהשרת
  const fetchLatestData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/instruments/latest');
      if (response.ok) {
        const data = await response.json();
        setInstrumentData({
          altitude: data.altitude,
          his: data.his,
          adi: data.adi
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
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
      const response = await fetch('http://localhost:5000/api/instruments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        const data = await response.json();
        setInstrumentData({
          altitude: data.altitude,
          his: data.his,
          adi: data.adi
        });
        setShowInputDialog(false);
      } else {
        const errorData = await response.json();
        alert(`שגיאה: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('שגיאה בשליחת הנתונים');
    }
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
          onSubmit={handleDataSubmit} 
          onClose={() => setShowInputDialog(false)} 
          initialData={instrumentData}
        />
      )}
    </div>
  );
}

export default App;