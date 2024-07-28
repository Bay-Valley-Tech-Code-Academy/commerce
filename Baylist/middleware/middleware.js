// Baylist/middlewares/dbMiddleware.js
// throws generic errors from business logic but is not flooded with http specific codes

import pool from '../config/db.js'; // Importing the pool from db.js

// Middleware for input validation
export const validateId = (id) => {
    if (!id || isNaN(id) || !Number.isInteger(Number(id)) || id <= 0) {
        throw new Error('Validation failed: invalid id');
    }
};

// Middleware to check if an entity exists by ID
export const validateEntityExists = async (tableName, id, column = `${tableName}_id`) => {
    validateId(id); // First validate the ID format
    const query = `SELECT 1 FROM ${tableName} WHERE ${column} = ? LIMIT 1`;
    const result = await executeQuery(query, [id]);
    if (result.length === 0) {
        throw new Error(`${column} with ID ${id} not found`);
    }
};

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

// Middleware to fetch a single entity by ID
export const getById = async (tableName, id) => {
    const query = `SELECT * FROM ${tableName} WHERE ${tableName}_id = ?`;
    const result = await executeQuery(query, [id]);
    if (result.length === 0) {
        throw new Error(`${tableName} with ID ${id} not found`);
    }
    return result[0]; // Return the first row found
};

// Middleware to handle INSERT or create an entity without worrying about id
export const createEntity = async (table, data) => {
    const fields = Object.keys(data).map(field => {
        // Check if the field is 'condition' and wrap it in backticks if necessary
        return field === 'condition' ? `\`${field}\`` : field;
    }).join(', ');
    const values = Object.values(data);
    const placeholders = values.map(() => '?').join(', ');

    const query = `INSERT INTO ${table} (${fields}) VALUES (${placeholders})`;
    const result = await executeQuery(query, values);
    return result.insertId;
};

// Middleware to update an entity by ID
export const updateById = async (table, id, data) => {
    const existingEntity = await getById(table, id); // Check if entity with ID exists first
    if (!existingEntity) {
        throw new Error(`${table} with ID ${id} not found`);
    }
    if (Object.keys(data).length === 0) {
        throw new Error('No fields provided for update');
    }

    const fields = Object.keys(data).map(field => `${field} = ?`).join(', ');
    const values = [...Object.values(data), id]; // Include ID for WHERE clause
    const query = `UPDATE ${table} SET ${fields} WHERE ${table}_id = ?`;
    const result = await executeQuery(query, values);

    if (result.affectedRows === 0) {
        throw new Error(`${table} with ID ${id} not found`);
    }
};

// Middleware to delete an entity by ID
export const deleteById = async (table, id) => {
    const query = `DELETE FROM ${table} WHERE ${table}_id = ?`;
    const result = await executeQuery(query, [id]);
    if (result.affectedRows === 0) {
        throw new Error(`${table} with ID ${id} not found`);
    }
};
