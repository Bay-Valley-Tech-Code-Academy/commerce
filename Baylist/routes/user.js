import express from 'express';
import * as middleware from '../middleware/middleware.js';
import bcrypt from 'bcrypt';

const router = express.Router();
const tableName = 'user';

// GET all user
router.get('/', async (req, res) => {
    try {
        const users = await middleware.executeQuery('SELECT * FROM user');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// GET user by ID
router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await middleware.getById(tableName, userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user); // Return the user data
    } catch (error) {
        console.error('Error fetching user:', error.message);
        if (error.message.includes('not found')) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(500).json({ error: 'Error fetching user' });
    }
});


// POST create user
router.post('/', async (req, res) => {
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
        res.status(500).json({ error: 'Error creating user' });
    }
});

// PUT update user by ID
router.put('/:id', async (req, res) => {
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
        await middleware.updateById(tableName, userId, data);
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user' });
    }
});

// DELETE user by ID
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        await middleware.deleteById(tableName, userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting User' });
    }
});

export default router;