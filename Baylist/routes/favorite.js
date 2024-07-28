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
            SELECT favlist_id
            FROM favlist
            WHERE user_id = ?;
        `;
        const lists = await middleware.executeQuery(query, [user_id]);
        res.json(lists);
    } catch (error) {
        next(error);
    }
});

// GET all favorite products in a specific list for a user
router.get('/:user_id/lists/:favlist_id', async (req, res, next) => {
    const { user_id, favlist_id } = req.params;
    try {
        // Validate that the user_id and favlist_id exist in their respective tables
        await middleware.validateEntityExists('user', user_id, 'user_id');
        await middleware.validateEntityExists('favlist', favlist_id, 'favlist_id');

        // Check if the favorite list exists for the user
        const checkQuery = `
            SELECT 1 FROM favlist
            WHERE user_id = ? AND favlist_id = ?;
        `;
        const checkResult = await middleware.executeQuery(checkQuery, [user_id, favlist_id]);
        if (checkResult.length === 0) {
            return res.status(404).json({ message: 'Favorite list not found for this user' });
        }

        // Retrieve all favorite products in the specific list for the user
        const query = `
            SELECT favorite_id
            FROM favorite
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
        await middleware.validateEntityExists('favorite', favlist_id, 'favlist_id'); // Validate favlist_id
        await middleware.validateEntityExists('product', favorite_id, 'product_id'); // Validate favorite_id

        const query = `
            SELECT p.*
            FROM favorite f
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

        // Insert a new favorite list for the user
        const insertFavlistQuery = `
            INSERT INTO favlist (user_id)
            VALUES (?)
        `;
        const result = await middleware.executeQuery(insertFavlistQuery, [user_id]);

        res.status(201).json({ list_id: result.insertId, message: `Favorite list ${result.insertId} created successfully` });
    } catch (error) {
        next(error);
    }
});

// POST add a product to an existing favorite list for a user
router.post('/:user_id/lists/:favlist_id/products/:product_id', async (req, res, next) => {
    const { user_id, favlist_id, product_id } = req.params;
    try {
        // Validate that the user_id, favlist_id, and product_id exist
        await middleware.validateEntityExists('user', user_id, 'user_id');
        await middleware.validateEntityExists('favlist', favlist_id, 'favlist_id');
        await middleware.validateEntityExists('product', product_id, 'product_id');

        // Check if the product already exists in the favorite list
        const checkQuery = `
            SELECT 1 FROM favorite
            WHERE user_id = ? AND favlist_id = ? AND favorite_id = ?;
        `;
        const checkResult = await middleware.executeQuery(checkQuery, [user_id, favlist_id, product_id]);

        if (checkResult.length > 0) {
            return res.status(409).json({ message: 'Product already exists in the favorite list' });
        }

        // Insert into the favorite table
        const insertQuery = `
            INSERT INTO favorite (user_id, favlist_id, favorite_id)
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
        // Validate that the user_id, favlist_id, and product_id exist
        await middleware.validateEntityExists('user', user_id, 'user_id');
        await middleware.validateEntityExists('favlist', favlist_id, 'favlist_id');
        await middleware.validateEntityExists('product', product_id, 'product_id');

        // Check if the product exists in the favorite list
        const checkQuery = `
            SELECT 1
            FROM ${tableName}
            WHERE user_id = ? AND favlist_id = ? AND favorite_id = ?;
        `;
        const checkResult = await middleware.executeQuery(checkQuery, [user_id, favlist_id, product_id]);

        if (checkResult.length === 0) {
            return res.status(404).json({ message: 'Product not found in the favorite list' });
        }

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


// DELETE an entire favorite list for a user
router.delete('/:user_id/lists/:favlist_id', async (req, res, next) => {
    const { user_id, favlist_id } = req.params;
    try {
        // Validate that the user_id and favlist_id exist
        await middleware.validateEntityExists('user', user_id, 'user_id');
        await middleware.validateEntityExists('favlist', favlist_id, 'favlist_id');

        // Delete associated products from the favorite table
        const deleteFavoritesQuery = `
            DELETE FROM favorite
            WHERE user_id = ? AND favlist_id = ?;
        `;
        await middleware.executeQuery(deleteFavoritesQuery, [user_id, favlist_id]);

        // Delete the favorite list from the favlist table
        const deleteFavlistQuery = `
            DELETE FROM favlist
            WHERE user_id = ? AND favlist_id = ?;
        `;
        await middleware.executeQuery(deleteFavlistQuery, [user_id, favlist_id]);

        res.status(200).json({ message: 'Favorite list and associated products deleted successfully' });
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
router.use(errorHandler);

export default router;
