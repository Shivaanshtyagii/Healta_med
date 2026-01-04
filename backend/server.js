const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db.js');

const app = express();

// 1. CORS - Explicitly allow your frontend origin for reliability
app.use(cors());

// 2. JSON PARSER
app.use(express.json());

// 3. ROUTES
app.use('/api/medications', require('./routes/medRoutes'));

// Define a startup function to await the DB connection
const startServer = async () => {
  try {
    await connectDB(); // Await the connection
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Critical: Server failed to start", err);
  }
};

startServer();