const express = require('express');
const router = express.Router();
const {userController} = require('../controllers/user.controller');

// Get all users
router.get('/', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user
router.put('/:id', userController.updateUser);

// (Add more user routes as needed)

module.exports = router;
