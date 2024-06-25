import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv'; // Import dotenv for loading environment variables

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const initializeDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log('Connected to the MySQL database! You\'re using:', process.env.DB_NAME );
    await connection.end(); // Close the connection after use
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

// Initialize database connection on application start
initializeDatabase();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen
