import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = process.env.PORT || 3000;

const initializeDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'baylist-commerce-database',
    });
    console.log('Connected to the MySQL database');
    connection.end();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

initializeDatabase();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
