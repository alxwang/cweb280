const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// CRUD Routes
router.get('/users', userController.getAllUsers);           // Get all users
router.get('/users/:email', userController.getUserById);    // Get user by email (or id)
router.post('/users', userController.createNewUser);        // Create new user
router.put('/users/:id', userController.updateUser);        // Update user by ID
router.delete('/users/:id', userController.deleteUser);     // Delete user by ID

module.exports = router;