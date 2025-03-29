const mongoose = require('mongoose');

const InstrumentReadingSchema = new mongoose.Schema({
  altitude: {
    type: Number,
    required: true,
    min: 0,
    max: 3000
  },
  his: {
    type: Number,
    required: true,
    min: 0,
    max: 360
  },
  adi: {
    type: Number,
    required: true,
    min: -100,
    max: 100
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('InstrumentReading', InstrumentReadingSchema);