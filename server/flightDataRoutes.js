const express = require('express');
const router = express.Router();
const FlightData = require('./FlightData');

// קבלת כל נתוני הטיסה
router.get('/flight-data', async (req, res) => {
  try {
    const flightData = await FlightData.find().sort({ timestamp: -1 }).limit(100);
    res.json(flightData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// קבלת נתוני הטיסה האחרונים
router.get('/flight-data/latest', async (req, res) => {
  try {
    const latestData = await FlightData.findOne().sort({ timestamp: -1 });
    res.json(latestData || { altitude: 0, his: 0, adi: 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// הוספת נתוני טיסה חדשים
router.post('/flight-data', async (req, res) => {
  try {
    const { altitude, his, adi } = req.body;
    
    // וידוא שהערכים תקינים
    if (altitude < 0 || altitude > 3000) {
      return res.status(400).json({ message: 'Altitude must be between 0 and 3000' });
    }
    if (his < 0 || his > 360) {
      return res.status(400).json({ message: 'HIS must be between 0 and 360' });
    }
    if (adi < -100 || adi > 100) {
      return res.status(400).json({ message: 'ADI must be between -100 and 100' });
    }
    
    const newFlightData = new FlightData({
      altitude,
      his,
      adi
    });
    
    const savedData = await newFlightData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;