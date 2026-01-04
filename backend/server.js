const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db.js');

const app = express();
connectDB();

// 1. CORS MUST BE FIRST
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}));

// 2. JSON PARSER MUST BE SECOND
app.use(express.json());

// 3. ROUTES MUST BE LAST
app.use('/api/medications', require('./routes/medRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));