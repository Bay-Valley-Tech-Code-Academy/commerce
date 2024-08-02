// server.js

import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv'; // Import dotenv for loading environment variables
import productRoute from './routes/product.js'; 
import userRoute from './routes/user.js'; 
import favoriteRoute from './routes/favorite.js';
import storeRoute from './routes/store.js';
import errorHandler from './middleware/errorHandler.js';

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
app.use('/api/products', productRoute); // Use the productsRoute function with the pool
app.use('/api/user', userRoute);
app.use('/api/favorite', favoriteRoute);
app.use('/api/store', storeRoute);

app.use(errorHandler);

// Start the server
app.listen(port, () => {
    initializeDatabase();
    console.log(`Server is running on port ${port}`);
});