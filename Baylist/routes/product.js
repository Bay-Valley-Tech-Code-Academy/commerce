// Baylist/routes/products.js

import express from 'express';
import * as middleware from '../middleware/middleware.js';
import { errorHandler } from '../middleware/errorHandler.js';

const router = express.Router();
const tableName = 'product';

// GET all products
router.get('/', async (req, res, next) => {
    try {
        const products = await middleware.executeQuery('SELECT * FROM product');
        res.json(products);
    } catch (error) {
        next(error); // Pass error to next middleware (errorHandler)
    }
});

// GET product by ID
router.get('/:id', async (req, res, next) => {
    const productId = req.params.id;
    try {
        middleware.validateId(productId);
        const product = await middleware.getById(tableName, productId);
        res.json(product); // Return the product object directly
    } catch (error) {
        next(error);
    }
});

// POST create product
router.post('/', async (req, res, next) => {
    const data = req.body;
    // Always include a creation timestamp
    data.created_at = new Date().toISOString();
    try {
        const productId = await middleware.createEntity(tableName, data);
        res.status(201).json({ id: productId });
    } catch (error) {
        next(error);
    }
});

// PUT update product by ID
router.put('/:id', async (req, res, next) => {
    const productId = req.params.id;
    const data = req.body;
    try {
        middleware.validateId(productId);
        await middleware.updateById(tableName, productId, data);
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        next(error);
    }
});

// DELETE product by ID
router.delete('/:id', async (req, res, next) => {
    const productId = req.params.id;
    try {
        middleware.validateId(productId);
        await middleware.deleteById(tableName, productId);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
});

router.use(errorHandler);

export default router;
