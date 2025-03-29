import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DataInput from './components/DataInput';
import { fetchLatestFlightData } from './services/api';

function App() {
  const [displayMode, setDisplayMode] = useState('visual');
  const [showDataInput, setShowDataInput] = useState(false);
  const [flightData, setFlightData] = useState({ 
    altitude: 0, 
    his: 0, 
    adi: 0 
  });
  
  useEffect(() => {
    // פונקציה לעדכון נתונים מהשרת
    const fetchData = async () => {
      try {
        const data = await fetchLatestFlightData();
        setFlightData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
    
    const intervalId = setInterval(fetchData, 2000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const handleDataUpdate = (newData) => {
    setFlightData(newData);
    setShowDataInput(false);
  };
  
  return (
    <div className="app">
      <Header 
        displayMode={displayMode} 
        setDisplayMode={setDisplayMode}
        setShowDataInput={setShowDataInput}
      />
      
      <main className="main-content">
        {showDataInput ? (
          <DataInput onDataSubmit={handleDataUpdate} />
        ) : (
          <Dashboard 
            flightData={flightData} 
            displayMode={displayMode} 
          />
        )}
      </main>
    </div>
  );
}

export default App;