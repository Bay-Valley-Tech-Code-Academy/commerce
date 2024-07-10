// Baylist/routes/products.js

import express from 'express';
import * as middleware from '../middleware/middleware.js';

const router = express.Router();
const tableName = 'product';

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await middleware.executeQuery('SELECT * FROM product');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// GET product by ID
router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await middleware.getById(tableName, productId);
        res.json(product); // Return the product object directly
    } catch (error) {
        console.error('Error fetching product:', error.message);
        if (error.message.includes('not found')) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(500).json({ error: 'Error fetching product' });
    }
});

// POST create product
router.post('/', async (req, res) => {
    const data = req.body;
    // Always include a creation timestamp
    data.created_at = new Date().toISOString();
    try {
        const productId = await middleware.createEntity(tableName, data);
        res.status(201).json({ id: productId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
});

// PUT update product by ID
router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const data = req.body;
    try {
        await middleware.updateById(tableName, productId, data);
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
});

// DELETE product by ID
router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        await middleware.deleteById(tableName, productId);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
});

export default router;
