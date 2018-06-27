const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const bodyParser = require('body-parser');


const app = express();

const indent = require('./routes/indent');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'scooby@25091997',
    database:'indenttry'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('connected');
});
module.exports = db;
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





app.get('/show', (req,res) => {
    let sql = 'SELECT * FROM info';
    db.query(sql,(err,result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})
app.get('/abc', (req,res) => {
    let sql = 'SELECT * FROM indent'
   db.query(sql,(err,result) => {
        if(err) throw err;
        res.render('indentview', {
            result:result
        })
    })
    
})

app.use('/',indent);
app.listen(3000, () => {
    console.log('server started on port 3000');
})
