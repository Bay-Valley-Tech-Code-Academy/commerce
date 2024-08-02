import express from 'express';
import * as middleware from '../middleware/middleware.js';
import { errorHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// GET all stores
router.get('/', async (req, res, next) => {
    try {
        const products = await middleware.executeQuery('SELECT * FROM store');
        res.json(products);
    } catch (error) {
        next(error); // Pass error to next middleware (errorHandler)
    }
});

// GET all products by store ID
router.get('/:id/products/', async (req, res, next) => {
    const store_id = req.params.id;
    try {
        await middleware.validateEntityExists('store', store_id, 'store_id'); // Validate store_id
        const query = `
            SELECT *
            FROM product
            WHERE store_id = ?;
        `;
        const lists = await middleware.executeQuery(query, [store_id]);
        res.json(lists);
    } catch (error) {
        next(error);
    }
});

// GET store info by store ID
router.get('/:storeId/', async (req, res, next) => {
    const store_id = req.params.storeId;
    try {
        await middleware.validateEntityExists('store', store_id, 'store_id');
        const store = await middleware.getById('store', store_id);
        res.json(store);
    } catch (error) {
        next(error);
    }
});

// POST a new store for a user
router.post('/new/:userId', async (req, res, next) => {
    const user_id = req.params.userId;
    const { store_name, description } = req.body;
    if (!store_name || typeof store_name !== 'string' || store_name.trim() === '') {
        return res.status(400).json({ error: 'Store name is required and cannot be empty' });
    }
    try {
        await middleware.validateEntityExists('user', user_id, 'user_id');
        const storeId = await middleware.createEntity('store', { user_id, store_name, description });
        res.status(201).json({ message: `Store ${storeId} created for userID ${user_id} successfully` });
    } catch (error) {
        next(error);
    }
});

// POST assign a product to a store
router.post('/:storeId/products/:productId', async (req, res, next) => {
    const { storeId, productId } = req.params;

    try {
        // Validate if the store exists
        await middleware.validateEntityExists('store', storeId, 'store_id');

        // Validate if the product exists
        await middleware.validateEntityExists('product', productId, 'product_id');

        // Update the product's store_id
        const query = `UPDATE product SET store_id = ? WHERE product_id = ?`;
        await middleware.executeQuery(query, [storeId, productId]);

        res.status(200).json({ message: `Product ${productId} assigned to store ${storeId} successfully` });
    } catch (error) {
        next(error);
    }
});

// PUT update a store by ID
router.put('/:storeId', async (req, res, next) => {
    const storeId = req.params.storeId;
    const { store_name, description, user_id } = req.body;

    try {
        middleware.validateId(storeId);
        await middleware.validateEntityExists('store', storeId, 'store_id');

        // Prepare the update data
        const updateData = {};
        if (store_name !== undefined) {
            if (typeof store_name !== 'string' || store_name.trim() === '') {
                throw new Error('Invalid store name provided');
            }
            updateData.store_name = store_name;
        }
        if (description !== undefined) {
            if (typeof description !== 'string') {
                throw new Error('Invalid description provided');
            }
            updateData.description = description;
        }
        if (user_id !== undefined) {
            middleware.validateId(user_id);
            await middleware.validateEntityExists('user', user_id, 'user_id');
            updateData.user_id = user_id;
        }

        if (Object.keys(updateData).length === 0) {
            throw new Error('No fields provided for update');
        }

        // Update the store
        await middleware.updateById('store', storeId, updateData);

        res.status(200).json({ message: 'Store updated successfully' });
    } catch (error) {
        next(error);
    }
});

// DELETE a store by ID (Cascade delete all products)
router.delete('/:storeId', async (req, res, next) => {
    const store_id = req.params.storeId;
    try {
        await middleware.validateEntityExists('store', store_id, 'store_id');
        await middleware.executeQuery('DELETE FROM product WHERE store_id = ?', [store_id]);
        await middleware.deleteById('store', store_id);
        res.status(200).json({ message: `Store ${store_id} and associated products deleted successfully` });
    } catch (error) {
        next(error);
    }
});

router.use(errorHandler);

export default router;