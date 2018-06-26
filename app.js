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
app.post('/', (req,res) => {
    let indent = {
        indentno:req.body.indentno,
        date:req.body.date,
        name:req.body.name,
        division:req.body.division,
        innernm1:req.body.innernm1,
        innernm2:req.body.innernm2,
        projectno:req.body.projectno,
        deadline:req.body.deadline,
        consequence:req.body.consequence,
        equipdetails:req.body.equipdetails,
        delreqnm:req.body.delreqnm,
        fundavail:req.body.fundavail,
        projectnm:req.body.projectnm,
        budget:req.body.budget,
        necfundavail:req.body.fundavail,
        installreq:req.body.installreq,
        vend1:req.body.vend1,
        vend2:req.body.vend2,
        vend3:req.body.vend3,
        inspectionunder:req.body.inspectionunder,
        certifiedavail:req.body.certifiedavail
    }

    
        let material = {
            indentno:req.body.indentno,
            sno:req.body.one1,
            materialname:req.body.two1,
            qty:req.body.three1,
            estimatedcost:req.body.four1
        };
    let sql1 = 'INSERT INTO indent SET ?';
    let sql2 = 'INSERT INTO material SET ?';
    let query1 = db.query(sql1,indent,(err,result) => {
        if(err) throw err;
        console.log(result);
    })
    let query2 = db.query(sql2,material,(err,result) => {
        if(err) throw err;
        console.log(result);
    })
 res.send('done');
})

app.use('/',indent);
app.listen(3000, () => {
    console.log('server started on port 3000');
})
