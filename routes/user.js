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
  res.render('user/login')
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
    failureFlash: true,
    
  })(req, res, next);
 
  
});



// Register Form POST
router.post('/register', (req,res) => {
  let errors = []
  
  if(req.body.password != req.body.password2){
    errors.push({text:'Passwords do not match'});
  }

  if(req.body.password.length < 4){
    errors.push({text:'Password must be at least 4 characters'});
  }
  if(errors.length>0){
    res.render('user/register', {
      errors: errors,
      name: req.body.name,
      emailid: req.body.emailid,
      contact_no:req.body.contact_no,
      password: req.body.password,
      password2: req.body.password2
    });
  }

    

  else {
    let sql4 = 'SELECT * FROM newuser WHERE emailid =?';
   
  
    db.query(sql4,[req.body.emailid],(err,rows) => {
        if(err) throw err;
       
       if(rows[0]){
        req.flash('error_msg', 'Email already regsitered');
        res.redirect('/user/register')
       }
      else{

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
          req.flash('success_msg', 'You are Registered Successfuly')
          res.redirect('/user/login');
      });
    });
  
  
    });
  
}  
})
  }

  })

  
  
   
 


// Logout User
router.get('/logout', (req, res) => {
  // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  req.session.destroy((err) => {
  res.redirect('/user/login');  
  })

  // req.flash('success_msg', 'You are logged out');
  
});

module.exports = router;

