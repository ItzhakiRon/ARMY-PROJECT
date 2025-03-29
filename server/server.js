const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const instrumentRoutes = require('./routes/instruments');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// חיבור למסד נתונים MongoDB
mongoose.connect('mongodb://localhost:27017/pilot-monitor', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Routes
app.use('/api/instruments', instrumentRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Pilot Monitor API is running');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server is accessible from all network interfaces`);
});