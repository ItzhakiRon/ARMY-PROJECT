const express = require('express');
const router = express.Router();
const InstrumentReading = require('../models/InstrumentReading');

// קבלת כל הקריאות
router.get('/', async (req, res) => {
  try {
    const readings = await InstrumentReading.find().sort({ timestamp: -1 }).limit(20);
    res.json(readings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// קבלת קריאה אחרונה
router.get('/latest', async (req, res) => {
  try {
    const reading = await InstrumentReading.findOne().sort({ timestamp: -1 });
    if (!reading) return res.status(404).json({ message: 'No readings found' });
    res.json(reading);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// יצירת קריאה חדשה
router.post('/', async (req, res) => {
  const { altitude, his, adi } = req.body;
  
  // בדיקת תקינות נתונים
  if (altitude < 0 || altitude > 3000) {
    return res.status(400).json({ message: 'Altitude must be between 0 and 3000' });
  }
  if (his < 0 || his > 360) {
    return res.status(400).json({ message: 'HIS must be between 0 and 360' });
  }
  if (adi < -100 || adi > 100) {
    return res.status(400).json({ message: 'ADI must be between -100 and 100' });
  }

  const reading = new InstrumentReading({
    altitude,
    his,
    adi
  });

  try {
    const newReading = await reading.save();
    res.status(201).json(newReading);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;