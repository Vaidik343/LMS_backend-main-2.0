const express = require('express');
const router = express.Router();
const {authController} = require('../controllers/auth.Controller');
const authMiddleware = require("../middleware/authMiddleware")
//public
router.post("/google-login", authController.loginWithGoogle);
router.post("/refresh-token", authController.refreshToken);

//protected
router.post("/logout", authMiddleware, authController.logout);
router.get("/me", authMiddleware, authController.getMe);


module.exports = router;

