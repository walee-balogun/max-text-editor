const express = require('express');
const ensureAuthenticated = require('../middlewares/auth');

const router = express.Router();


const authRoutes = ({ authController }) => {

    router.post('/register', authController.register);
    router.post('/login', authController.login);
    router.get('/profile', ensureAuthenticated, authController.profile);

    return router;
}

module.exports = authRoutes;
