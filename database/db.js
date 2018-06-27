const mysql = require('mysql');

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