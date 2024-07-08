// Baylist/routes/index.js

import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Example route to get products
router.get('/products', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM products'); // Adjust this query to match your database schema
        res.json(results);
        console.log(res.json(results));
    } catch (err) {
        console.error('Error fetching products:', err); // Log the error
        res.status(500).json({ error: err.message });
    }
});

export default router;