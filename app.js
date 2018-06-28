const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const mysql = require('mysql');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const db = require('./database/db')


const app = express();

const indent = require('./routes/indent');
const user = require('./routes/user')

// Passport Config
require('./config/passport')(passport);



//set static folder
app.use(express.static(path.join(__dirname,'public')));

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// view engine setup
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
  }));
  app.set('view engine', 'handlebars');

  // Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
  
  app.use(flash());

 

// Global variables
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });

  app.use(passport.initialize());
  app.use(passport.session());
  



app.use('/',indent);
app.use('/user',user)
app.listen(3000, () => {
    console.log('server started on port 3000');
})
