import express from 'express';
import * as middleware from '../middleware/middleware.js';
import bcrypt from 'bcrypt';
import { errorHandler } from '../middleware/errorHandler.js';

const router = express.Router();
const tableName = 'user';

// GET all user
router.get('/', async (req, res, next) => {
    try {
        const users = await middleware.executeQuery('SELECT * FROM user');
        res.json(users);
    } catch (error) {
        next(error); // Pass error to next middleware (errorHandler)
    }
});

// GET user by ID
router.get('/:id', async (req, res, next) => {
    const userId = req.params.id;
    try {
        middleware.validateId(userId);
        const user = await middleware.getById(tableName, userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user); // Return the user data
    } catch (error) {
        next(error);
    }
});


// POST create user
router.post('/', async (req, res, next) => {
    const { username, email, password, address, profile_pic } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
        const newUser = {
            username,
            email,
            password: hashedPassword,
            address,
            profile_pic,
            created_at: new Date().toISOString() 
        };

        // Save user to database using middleware function
        const userId = await middleware.createEntity(tableName, newUser);

        res.status(201).json({ id: userId });
    } catch (error) {
        next(error);
    }
});

// PUT update user by ID
router.put('/:id', async (req, res, next) => {
    const userId = req.params.id;
    const data = req.body;
    if (data.password) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword; // Replace plain-text password with hashed password
        } catch (error) {
            console.error('Error hashing password:', error);
            return res.status(500).json({ error: 'Error updating user' });
        }
    }
    // Update user using middleware
    try {
        middleware.validateId(userId);
        await middleware.updateById(tableName, userId, data);
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        next(error);
    }
});

// DELETE user by ID
router.delete('/:id', async (req, res, next) => {
    const userId = req.params.id;
    try {
        middleware.validateId(userId);
        await middleware.deleteById(tableName, userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
});

router.use(errorHandler);

export default router;