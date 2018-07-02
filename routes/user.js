const express = require('express');
const router = express.Router();
const db = require('../database/db');
const passport = require('passport');
const bcrypt = require('bcryptjs');



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
router.post('/register', (req,res) => {
  const user = {
    name:req.body.name,
    emailid:req.body.emailid,
    contact_no:req.body.contact_no,
    password:req.body.password
    
  };
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) throw err;
      const newuser = {
        name:req.body.name,
        emailid:req.body.emailid,
        contact_no:req.body.contact_no,
        password: hash
        
      };
      let sql1 = 'INSERT INTO newuser SET ?';
   
      let query1 = db.query(sql1,newuser,(err,result) => {
          if(err) throw err;
          console.log(result);
          res.send('saved');
      });
    });
  
      
    })
  })

  
  
   
 


// Logout User
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

module.exports = router;

