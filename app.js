const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const mysql = require('mysql');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');;
const htmlToPdf = require('html-to-pdf');
const phantom = require('phantom');
const db = require('./database/db')


const app = express();

const indent = require('./routes/indent');
const user = require('./routes/user');
const extra =require('./routes/extra')

// Passport Config
require('./config/passport')(passport);



//set static folder
app.use(express.static(path.join(__dirname,'public')));

const {
  formatDate,
  ifcond
} = require('./helpers/hbs');

app.use(methodOverride('_method'));
// view engine setup
app.engine('handlebars', exphbs({

    helpers: { // to help the handlebars in formating
       
      formatDate: formatDate,
      ifcond:ifcond
      
    },

    defaultLayout: 'main'
  }));
  app.set('view engine', 'handlebars');

  // Express session midleware

  //body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(bodyParser.json())
  
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }));
  
  app.use(passport.initialize()); 
  app.use(passport.session());

  app.use(function(req, res, next) {
    if(!req.user) 
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  });


  app.use(flash());
//#####
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

 


 
  
  
// Global variables



app.use('/',extra);
app.use('/',indent);
app.use('/user',user)

port = 8080;
app.listen(port,'0.0.0.0', () => {
    console.log('server started on port 8080');
})
