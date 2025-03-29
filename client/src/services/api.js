const API_BASE_URL = 'http://localhost:5000/api';

// פונקציה לקבלת הנתונים האחרונים
export const fetchLatestFlightData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/flight-data/latest`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching latest flight data:', error);
    throw error;
  }
};

// פונקציה לשליחת נתונים חדשים
export const sendFlightData = async (flightData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/flight-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(flightData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending flight data:', error);
    throw error;
  }
};