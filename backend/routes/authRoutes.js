// backend/routes/authRoutes.js
const express = require('express');
const passport = require('../config/passport');

const router = express.Router();
const { signup, login, getProfile, registerUser, verifyEmail } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/auth/signup
// router.post('/signup', signup);

// @route   POST /api/auth/login
// router.post('/login', login);

// User Registration
router.post('/register', registerUser);

// Email Verification
router.post('/verify-email', verifyEmail);

// @route   GET /api/auth/profile
router.get('/profile', authMiddleware, getProfile);


router.get('/', (req, res) => {
    res.send('Welcome Home!');
});

// Example login route
router.get('/login', (req, res) => {
    res.send('Please log in.');
});

console.log(passport);
router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/api/auth/profile',
  failureMessage: true, 
  failureRedirect: '/api/auth/'
}));

// Discord Authentication
router.get('/auth/discord', passport.authenticate('discord'));
router.get('/auth/discord/callback', passport.authenticate('discord', {
  successRedirect: '/profile',
  failureRedirect: '/'
}));

module.exports = router;
