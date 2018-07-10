const express = require('express');
const router = express.Router();
const db = require('../database/db');

const { ensureAuthenticated } = require('../helpers/ensureauth')


router.get('/', (req,res) => {
    if(req.user){
    db.query('Select id from newuser where id = ?',[req.user[0].id],(err,result) => {
        if(err) throw err;
        res.render('index', {
            user:req.user[0]
            
        })
    });
}
else {
    res.render('index')
}
});

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
        userid : req.user[0].id,
       
        one1:req.body.one1,
        two1:req.body.two1,
        three1:req.body.three1,
        four1:req.body.four1,
        
        one2:req.body.one2,
        two2:req.body.two2,
        three2:req.body.three2,
        four2:req.body.four2,

        one3:req.body.one3,
        two3:req.body.two3,
        three3:req.body.three3,
        four3:req.body.four3    
    }

    
        
    let sql1 = 'INSERT INTO indent SET ?';
    let query1 = db.query(sql1,indent,(err,result) => {
        if(err) throw err;
        res.redirect('/dashboard');    
    })
    


 
});

router.get('/indent/:id',ensureAuthenticated ,(req,res) => {
    let sql = 'SELECT * FROM indent WHERE indentno =?';
   
  
    db.query(sql,[req.params.id],(err,rows) => {
        if(err) throw err;
        if(rows[0].one2 === " ")
        {
            display = 'display',
            none = 'none'

        }
        else 
        {
            display = '',
            none = '' 
        }
        res.render('indentview', {
           rows:rows,
           user:req.user[0],
           display:display,
           none:none
           
       })
       
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
router.get('/indentform', ensureAuthenticated,(req,res) => {
    db.query('Select id from newuser where id = ?',[req.user[0].id],(err,result) => {
        if(err) throw err;
        res.render('user/form', {
            user:req.user[0]
            
        })
    });
})

module.exports = router;