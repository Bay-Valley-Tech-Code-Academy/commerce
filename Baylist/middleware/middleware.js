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

// Middleware to fetch a single entity by ID
export const getById = async (table, id) => {
    const query = `SELECT * FROM ${table} WHERE ${table}_id = ?`;
    return await executeQuery(query, [id]);
};

// Middleware to handle INSERT or create an entity without worrying about id
export const createEntity = async (table, data) => {
    const fields = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map(() => '?').join(', ');

    const query = `INSERT INTO ${table} (${fields}) VALUES (${placeholders})`;
    const result = await executeQuery(query, values);
    return result.insertId;
};

// Middleware to update an entity by ID
export const updateById = async (table, id, data) => {
    const fields = Object.keys(data).map(field => `${field} = ?`).join(', ');
    const values = Object.values(data);
    values.push(id);

    const query = `UPDATE ${table} SET ${fields} WHERE ${table}_id = ?`;
    await executeQuery(query, values);
};

// Middleware to delete an entity by ID
export const deleteById = async (table, id) => {
    const query = `DELETE FROM ${table} WHERE ${table}_id = ?`;
    const result = await executeQuery(query, [id]);
    if (result.affectedRows === 0) {
        throw new Error(`${table} not found`);
    }
};
