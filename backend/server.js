require('dotenv').config();
require('dns').setDefaultResultOrder('ipv4first'); // <--- ADD THIS CRITICAL LINE
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { keyPairFromSeed } = require('./eddsa');

const app = express();

// Set up CORS - Strictly allow only your frontend URLs
const allowedOrigins = [
    'http://localhost:3000', 
    'https://ua-canteen-evaluation.vercel.app' 
];
if (process.env.FRONTEND_URL) allowedOrigins.push(process.env.FRONTEND_URL);

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// CRITICAL FIX: Allow the server to accept large Base64 photos without crashing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use('/api', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));

