import express from 'express';
import * as middleware from '../middleware/middleware.js'; 
import { errorHandler } from '../middleware/errorHandler.js'; 

const router = express.Router();
const tableName = 'favorite'; 

// GET all favorite lists for a user
router.get('/:user_id/lists', async (req, res, next) => {
    const { user_id } = req.params;
    try {
        await middleware.validateEntityExists('user', user_id, 'user_id'); // Validate user_id
        const query = `
            SELECT DISTINCT favlist_id
            FROM ${tableName}
            WHERE user_id = ?;
        `;
        const lists = await middleware.executeQuery(query, [user_id]);
        res.json(lists);
    } catch (error) {
        next(error);
    }
});

// GET all favorite products in a specific list for a user
router.get('/:user_id/lists/:favlist_id/', async (req, res, next) => {
    const { user_id, favlist_id } = req.params;
    try {
        await middleware.validateEntityExists('user', user_id, 'user_id'); // Validate user_id
        await middleware.validateEntityExists(tableName, favlist_id, 'favlist_id'); // Validate favlist_id
        const query = `
      SELECT favorite_id
      FROM ${tableName}
      WHERE user_id = ? AND favlist_id = ?;
    `;
        const products = await middleware.executeQuery(query, [user_id, favlist_id]);
        res.json(products);
    } catch (error) {
        next(error);
    }
});

// GET specific favorite product information from their existing favorite list
router.get('/:user_id/lists/:favlist_id/products/:favorite_id', async (req, res, next) => {
    const { user_id, favlist_id, favorite_id } = req.params;
    try {
        await middleware.validateEntityExists('user', user_id, 'user_id'); // Validate user_id
        await middleware.validateEntityExists(tableName, favlist_id, 'favlist_id'); // Validate favlist_id
        await middleware.validateEntityExists('product', favorite_id, 'product_id'); // Validate favorite_id

        const query = `
            SELECT p.*
            FROM ${tableName} f
            JOIN product p ON f.favorite_id = p.product_id
            WHERE f.user_id = ? AND f.favlist_id = ? AND f.favorite_id = ?;
        `;
        const favoriteProduct = await middleware.executeQuery(query, [user_id, favlist_id, favorite_id]);

        if (favoriteProduct.length === 0) {
            return res.status(404).json({ message: 'Favorite product not found' });
        }

        res.json(favoriteProduct[0]);
    } catch (error) {
        next(error);
    }
});

// POST create a new favorite list for a user
router.post('/:user_id/lists', async (req, res, next) => {
    const { user_id } = req.params;
    try {
        await middleware.validateEntityExists('user', user_id, 'user_id'); // Validate user_id

        // Example query to create a new favorite list for the user
        const insertQuery = `INSERT INTO ${tableName} (user_id) VALUES (?)`;
        const result = await middleware.executeQuery(insertQuery, [user_id]);

        res.status(201).json({ list_id: result.insertId, message: 'Favorite list created successfully' });
    } catch (error) {
        next(error);
    }
});

// POST add a product to an existing favorite list for a user
router.post('/:user_id/lists/:favlist_id/products/:product_id', async (req, res, next) => {
    const { user_id, favlist_id, product_id } = req.params;
    try {
        middleware.validateId(user_id); // Validate user_id
        middleware.validateId(favlist_id); // Validate favlist_id
        middleware.validateId(product_id); // Validate product_id

        const insertQuery = `
            INSERT INTO ${tableName} (user_id, favlist_id, favorite_id)
            VALUES (?, ?, ?)
        `;
        const values = [user_id, favlist_id, product_id];
        await middleware.executeQuery(insertQuery, values);

        res.status(201).json({ message: 'Product added to favorite list successfully' });
    } catch (error) {
        next(error);
    }
});


// DELETE remove a product from a favorite list
router.delete('/:user_id/lists/:favlist_id/products/:product_id', async (req, res, next) => {
    const { user_id, favlist_id, product_id } = req.params;
    try {
        await middleware.validateEntityExists('user', user_id, 'user_id'); // Validate user_id
        middleware.validateId(favlist_id); // Validate favlist_id
        middleware.validateId(product_id); // Validate product_id

        // Example query to delete a product from the favorite list
        const deleteQuery = `
      DELETE FROM ${tableName}
      WHERE user_id = ? AND favlist_id = ? AND favorite_id = ?;
    `;
        await middleware.executeQuery(deleteQuery, [user_id, favlist_id, product_id]);

        res.json({ message: 'Product deleted from favorite list successfully' });
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
router.use(errorHandler);

export default router;
