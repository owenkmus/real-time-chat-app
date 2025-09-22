const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');
const validate = require('../middlewares/validation.middleware.js');
const { registerSchema, loginSchema } = require('../utils/validation.schemas.js');

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
