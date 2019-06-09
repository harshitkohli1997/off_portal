const mysql = require('mysql');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'**********',
    database:'indenttry',
    port: 3307
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('connected');
});
module.exports = db;
