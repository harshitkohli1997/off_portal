const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql = require('mysql');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');;
const htmlToPdf = require('html-to-pdf');
const phantom = require('phantom');
const db = require('./database/db')


const app = express();

const indent = require('./routes/indent');
const user = require('./routes/user')

// Passport Config
require('./config/passport')(passport);



//set static folder
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});



// view engine setup
app.engine('handlebars', exphbs({
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

  // app.get('/convert', (req,res) => {
    
 //   phantom.create().then(function(ph) {
   //   ph.createPage().then(function(page) {
     //     page.open("http://localhost:3000").then(function(status) {
       //       page.render('google.pdf').then(function() {
         //         console.log('Page Rendered');
           //       res.send('done')
             //     ph.exit();
              //});
          //});
      //});
  //});
  //})
//***************auth check************//
  // app.get('/check', (req,res) => {
//   if(req.user){
//     console.log('yes')
//   }
//     else {
// console.log('false')
//     }
  
//})
  app.use(flash());

 
  
  
// Global variables




app.use('/',indent);
app.use('/user',user)
app.listen(3000, () => {
    console.log('server started on port 3000');
})
