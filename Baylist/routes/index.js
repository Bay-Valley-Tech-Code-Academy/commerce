// Baylist/routes/index.js

import express from 'express';
import { getProductById, updateProductById, deleteProductById, executeQuery, createProduct } from '../middleware/middleware.js';

const router = express.Router();

// GET all products
router.get('/products', async (req, res) => {
    try {
        const products = await executeQuery('SELECT * FROM products');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// GET product by ID
router.get('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await getProductById(productId);
        if (product.length === 0) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.json(product[0]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
});

// POST create product
router.post('/products', async (req, res) => {
    const { name, description, category, brand, condition, price, stock, created_at } = req.body;
    try {
        const productId = await createProduct(name, description, category, brand, condition, price, stock, created_at);
        const insertedProduct = await getProductById(productId);
        res.status(201).json(insertedProduct[0]);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Error creating product' });
    }
});

// PUT update product by ID
router.put('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const updateFields = req.body;

    try {
        // Update the product with the provided fields
        await updateProductById(productId, updateFields);

        // Fetch and return the updated product
        const updatedProduct = await getProductById(productId);
        res.json(updatedProduct[0]);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Error updating product' });
    }
});




// DELETE product by ID
router.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        await deleteProductById(productId);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        if (error.message === 'Product not found') {
            res.status(404).json({ error: 'Product not found' });
        } else {
            console.error('Error deleting product:', error);
            res.status(500).json({ error: 'Error deleting product' });
        }
    }
});

export default router;
