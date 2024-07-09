// Baylist/middlewares/dbMiddleware.js

import pool from '../config/db.js'; // Importing the pool from db.js

// Middleware to execute SQL query
export const executeQuery = async (query, params = []) => {
    try {
        const [rows] = await pool.query(query, params);
        return rows;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database query failed');
    }
};

// Middleware to fetch a single product by ID
export const getProductById = async (productId) => {
    const query = 'SELECT * FROM products WHERE product_id = ?';
    return await executeQuery(query, [productId]);
};

// Middleware to handle INSERT or create product without worrying about id
export const createProduct = async (name, description, category, brand, condition, price, stock, created_at) => {
    const query = 'INSERT INTO products (name, description, category, brand, `condition`, price, stock, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const result = await executeQuery(query, [name, description, category, brand, condition, price, stock, created_at]);
    return result.insertId;
};

// Middleware to handle UPDATE product by ID
export const updateProductById = async (productId, updateFields) => {
    try {
        // Fetch current product data
        const currentProduct = await getProductById(productId);
        if (currentProduct.length === 0) {
            throw new Error(`Product with ID ${productId} not found.`);
        }

        // Merge updateFields with currentProduct to preserve existing values
        const updatedProduct = {
            ...currentProduct[0], // Spread current product data
            ...updateFields,     // Spread updated fields (overwrite if exists)
        };

        // Build the update query dynamically based on provided fields
        const fieldsToUpdate = Object.keys(updatedProduct).filter(key => key !== 'product_id'); // Exclude product_id from update

        // Prepare SET clause excluding condition
        const setClause = fieldsToUpdate.map(key => {
            if (key === 'condition') {
                return '`condition` = ?'; // Backtick `condition` to escape reserved keyword
            } else {
                return `${key} = ?`;
            }
        }).join(', ');

        // Gather values to update
        const updateParams = fieldsToUpdate.map(key => updatedProduct[key]);

        // Construct full query with placeholders
        const query = `UPDATE products SET ${setClause} WHERE product_id = ?`;

        // Execute the update query
        await executeQuery(query, [...updateParams, productId]);

    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Database query failed');
    }
};





// Middleware to handle DELETE product
export const deleteProductById = async (productId) => {
    const query = 'DELETE FROM products WHERE product_id = ?';
    const result = await executeQuery('SELECT * FROM products WHERE product_id = ?', [productId]);
    if (result.length === 0) {
        throw new Error('Product not found');
    }
    await executeQuery(query, [productId]);
};
