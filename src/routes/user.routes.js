const express = require('express');
const router = express.Router();
const {userController} = require('../controllers/user.controller');


const {authenticate} = require("../middleware/authMiddleware");
const {roleAuth} = require("../middleware/roleMiddleware");


router.use(authenticate)  
// Get all users
router.get('/users', roleAuth("User","read"), userController.getAllUsers);


// Get user by ID
router.get('/users/:id', roleAuth("User","read"),userController.getUserById);

// Update user
router.put('/users/:id',roleAuth("User","update"), userController.updateUser);

router.delete('/users/:id', roleAuth("User","delete"), userController.deleteUser);


module.exports = router;
