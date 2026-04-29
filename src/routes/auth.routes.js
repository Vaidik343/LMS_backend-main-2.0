const express = require('express');
const router = express.Router();
const {authController} = require('../controllers/auth.Controller');
const {authenticate} = require("../middleware/authMiddleware")

//public
router.post("/google-login", authController.loginWithGoogle);
router.post("/refresh-token", authController.refreshToken);

//protected
router.post("/logout", authenticate, authController.logout);
router.get("/me", authenticate, authController.getMe);


module.exports = router;

