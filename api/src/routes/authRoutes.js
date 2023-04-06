

const authController = require('../controllers/authController');
const authRoutes = require('express').Router();
authRoutes.post('/login', authController.loginUser);
module.exports = authRoutes;
