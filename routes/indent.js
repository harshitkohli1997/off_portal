const express = require('express');
const router = express.Router();
const db = require('../database/db');

const { ensureAuthenticated } = require('../helpers/ensureauth')


router.get('/', (req,res) => {
    res.render('index');
});
router.get('/indentform', ensureAuthenticated,(req,res) => {
    res.render('form')
})
router.post('/', (req,res) => {
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
        certifiedavail:req.body.certifiedavail,
        userid : req.user[0].id
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
    db.query(sql2,material,(err,result) => {
        if(err) throw err;
        console.log(result);
       
    })
    res.redirect('/user/dashboard')


 
});

router.get('/indent/:id',ensureAuthenticated ,(req,res) => {
    let sql = 'SELECT * FROM indent WHERE indentno =?';
   
  
    db.query(sql,[req.params.id],(err,rows) => {
        if(err) throw err;
       console.log(rows)
        res.send(rows)
    })
    
  
});

router.get('/dashboard', ensureAuthenticated,(req,res) => {
    db.query('Select * from indent where userid = ?',[req.user[0].id],(err,result) => {
        if(err) throw err;
        res.render('user/dashboard', {
            result:result,
            user:req.user[0]
            
        })
    });
})

module.exports = router;