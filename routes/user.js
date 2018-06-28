const express = require('express');
const router = express.Router();
const db = require('../database/db');
const passport = require('passport');


// Load User Model
// // require('../models/User');
// const User = mongoose.model('users');

// User Login Route
router.get('/login', (req, res) => {
  res.render('user/login');
});

// User Register Route
router.get('/register', (req, res) => {
  res.render('user/register');
});

// Login Form POST
router.post('/login', (req, res, next) => {
  passport.authenticate('local-login', {
    successRedirect:'/dashboard',
    failureRedirect: '/user/login',
    failureFlash: true
  })(req, res, next);
});



// Register Form POST
router.post('/register', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


// Logout User
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

module.exports = router;

