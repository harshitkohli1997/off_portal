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

// router.post('/', (req,res) => {
//     let indent = {
//         indentno:req.body.indentno,
//         date:req.body.date,
//         name:req.body.name,
//         division:req.body.division,
//         innernm1:req.body.innernm1,
//         innernm2:req.body.innernm2,
//         projectno:req.body.projectno,
//         deadline:req.body.deadline,
//         consequence:req.body.consequence,
//         equipdetails:req.body.equipdetails,
//         delreqnm:req.body.delreqnm,
//         fundavail:req.body.fundavail,
//         projectnm:req.body.projectnm,
//         budget:req.body.budget,
//         necfundavail:req.body.fundavail,
//         installreq:req.body.installreq,
//         vend1:req.body.vend1,
//         vend2:req.body.vend2,
//         vend3:req.body.vend3,
//         inspectionunder:req.body.inspectionunder,
//         certifiedavail:req.body.certifiedavail,
//         userid : req.user[0].id,
       
//         one1:req.body.one1,
//         two1:req.body.two1,
//         three1:req.body.three1,
//         four1:req.body.four1,
        
//         one2:req.body.one2,
//         two2:req.body.two2,
//         three2:req.body.three2,
//         four2:req.body.four2,

//         one3:req.body.one3,
//         two3:req.body.two3,
//         three3:req.body.three3,
//         four3:req.body.four3    
//     }

    
        
//     let sql1 = 'INSERT INTO indent SET ?';
//     let query1 = db.query(sql1,indent,(err,result) => {
//         if(err) throw err;
//         res.redirect('/dashboard');    
//     })
    


 
//});

router.get('/indent/:id',ensureAuthenticated ,(req,res) => {
    let sql = 'SELECT * FROM indent WHERE id =?';
   
  
    db.query(sql,[req.params.id],(err,rows) => {
        if(err) throw err;
       
        res.render('indentview', {
           rows:rows,
           user:req.user[0]
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

router.get('/test', (req,res) => {
    res.redirect('/dashboard');
})
router.get('/indentform', ensureAuthenticated,(req,res) => {
    db.query('Select id from newuser where id = ?',[req.user[0].id],(err,result) => {
        if(err) throw err;
        res.render('user/form', {
            user:req.user[0]
            
        })
    });
})
router.post('/', (req,res) => {
    // const date = new Date();
    // abc = 1;
    // console.log('ITD/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1) + '/'+abc );
    // abc++;
    // console.log(abc);
   db.query('select count from indentcount', (err,result) => {
    // db.query('insert into indentcount values SET ?', count,(err,result) => {
    //     if(err) throw err;
    //     res.render('user/form', {
    //         user:req.user[0]
            
    //     })
    // });
    const abc = result[0].count+1;
    db.query('update indentcount set ?  where ?',[{count:abc},{count:abc-1}],(err,result) => {

        const date = new Date();

        db.query('select count from indentcount', (err,result) => {

            console.log('ITD/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1) + '/'+result[0].count);
            const dude = 'ITD/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1) + '/'+result[0].count
            let indent = {
                indentno:dude,
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
    
        
          
})
    })
});

});
module.exports = router;