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
    database:'test'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('connected');
});
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



app.post('/', (req,res) => {
    let emp = {name:req.body.name,
        division:req.body.division};
        let tab = {
            one:req.body.one,
            two:req.body.two,
            three:req.body.three
        };
    let sql1 = 'INSERT INTO emp SET ?';
    let sql2 = 'INSERT INTO tab SET ?';
    let query1 = db.query(sql1,emp,(err,result) => {
        if(err) throw err;
        console.log('DONE');
    })
    let query2 = db.query(sql2,tab,(err,result) => {
        if(err) throw err;
        console.log('DONE');
    })
 res.send('done');
})

app.get('/show', (req,res) => {
    let sql = 'SELECT * FROM info';
    db.query(sql,(err,result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.use('/',indent);
app.listen(3000, () => {
    console.log('server started on port 3000');
})
