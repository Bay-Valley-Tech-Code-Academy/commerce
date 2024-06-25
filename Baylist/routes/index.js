// Baylist/routes/index.js

import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Example route to get products
router.get('/products', (req, res) => {
    const query = 'SELECT * FROM products'; // Adjust this query to match your database schema

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Test route to verify database connection
router.get('/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Database connection is working!', solution: results[0].solution });
    });
});

export default router;
