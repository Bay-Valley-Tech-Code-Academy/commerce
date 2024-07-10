// Baylist/routes/products.js

import express from 'express';
import * as middleware from '../middleware/middleware.js';

const router = express.Router();

// GET all products
router.get('/products', async (req, res) => {
    try {
        const products = await middleware.executeQuery('SELECT * FROM products');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// GET product by ID
router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await middleware.getById('products', productId);
        res.json(product[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
});

// POST create product
router.post('/', async (req, res) => {
    const data = req.body;
    try {
        const productId = await middleware.createEntity('products', data);
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
        await middleware.updateById('products', productId, data);
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
});

// DELETE product by ID
router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        await middleware.deleteById('products', productId);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
});

export default router;
