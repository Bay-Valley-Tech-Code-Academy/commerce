// server.js

import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv'; // Import dotenv for loading environment variables
import router from './routes/index.js'; // Adjust path as needed

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(express.json());

// MySQL connection setup
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Initialize database connection on application start
const initializeDatabase = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the MySQL database! You\'re using:', process.env.DB_NAME);
        connection.release();
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

// Import and use routes
app.use('/api', router); // Use the productsRoute function with the pool

// Start the server
app.listen(port, () => {
    initializeDatabase();
    console.log(`Server is running on port ${port}`);
});