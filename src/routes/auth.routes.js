const express = require('express');
const router = express.Router();
const {authController} = require('../controllers/auth.controller');

const {authenticate} = require("../middleware/authMiddleware");
const {roleAuth} = require("../middleware/roleMiddleware");

//public
// router.use(authenticate)  
router.post("/auth/google-login", authController.loginWithGoogle);
router.post("/auth/refresh-token", authController.refreshToken);

//protected
router.post("/auth/logout",authenticate,authController.logout);
router.get("/auth/me", authenticate, authController.getMe);


module.exports = router;

