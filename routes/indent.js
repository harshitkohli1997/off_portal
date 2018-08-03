const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const db = require('../database/db');

const { ensureAuthenticated } = require('../helpers/ensureauth')

router.use(fileUpload());

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

// router.get('/try1', (req,res) => {
//     console.log(req.user[0].type)
// })

router.get('/dashboard', ensureAuthenticated,(req,res) => {
    
    if(req.user[0].type === 'admin'){
        db.query('Select * from indent',(err,result) => {
            if(err) throw err;
            res.render('user/admindashboard', {
                result:result,
                
                
            })
        });
    }
    else {
    db.query('Select * from indent where userid = ?',[req.user[0].id],(err,result) => {
        if(err) throw err;
        res.render('user/dashboard', {
            result:result,
            user:req.user[0]
            
        })
    });
}
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
   if(req.user[0].department === 'ITD'){

    if (!req.files.sampleFile)
{
    console.log('not upload')
}
    
else {
    var path = 'uploads'+'/'+Date.now()+'.pdf';
     var upload = 'public/'+path;
    
     let sampleFile = req.files.sampleFile;
            sampleFile.mv(upload, function(err) {
              if (err)
                return console.log(err)
           
              console.log('file uploaded!')
            });
        }
   db.query(`select ITD from indentcount`, (err,result) => {
    const abc = result[0].ITD+1;
    db.query('update indentcount set ?  where ?',[{ITD:abc},{ITD:abc-1}],(err,result) => {

        const date = new Date();

        db.query('select ITD from indentcount', (err,result) => {

            console.log(req.user[0].department+'/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/' +(date.getMonth()+1) +'/'+result[0].ITD);
            const dude = req.user[0].department+ '/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/'+(date.getMonth()+1) + '/'+result[0].ITD
           
            
 
            // Use the mv() method to place the file somewhere on your server
            
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
                four3:req.body.four3,
                
                description:path
            }
        

            let sql1 = 'INSERT INTO indent SET ?';
    let query1 = db.query(sql1,indent,(err,result) => {
        if(err) throw err;
        res.redirect('/dashboard');    
    })

        
          
})
    })
});
   }
   else if(req.user[0].department === 'EIII'){
    db.query(`select EIII from indentcount`, (err,result) => {
     const abc = result[0].EIII+1;
     db.query('update indentcount set ?  where ?',[{EIII:abc},{EIII:abc-1}],(err,result) => {
 
         const date = new Date();
 
         db.query('select EIII from indentcount', (err,result) => {
 
             console.log(req.user[0].department+'/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/' +(date.getMonth()+1) +'/'+result[0].count);
             const dude = req.user[0].department+ '/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/'+(date.getMonth()+1) + '/'+result[0].EIII
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
    }
});

router.get('/admin/dashboard', ensureAuthenticated,(req,res) => {
    res.render('user/admindashboard')
});



router.delete('/indent/:id', (req,res) => {

    let sql2 = 'SELECT * FROM indent WHERE id =?';
   
  
    db.query(sql2,[req.params.id],(err,rows) => {
        if(err) throw err;
       

 let deldesc = {
     remarks :req.body.remarks,
     indentno:rows[0].indentno
 }

 db.query('INSERT INTO REMARKS SET ?', deldesc, (err,result) => {
     if(err) throw err;
     let sql = 'DELETE FROM indent WHERE id =?';
   
  
     db.query(sql,[req.params.id],(err,rows) => {
         if(err) throw err;
        
         res.redirect('/viewall');
        
     })

 });
    });
   
});

router.get('/viewall',ensureAuthenticated, (req,res) => {
    db.query('Select * from indent',(err,result) => {
        if(err) throw err;
        res.render('user/viewall', {
            result:result,
            
            
        })
    });
});

router.get('/viewuser', ensureAuthenticated,(req,res) => {
    const type = 'NULL';    
    db.query("Select * from newuser WHERE TYPE is Null",(err,result) => {
        if(err) throw err;
        res.render('user/viewuser', {
            result:result,
            
            
        })
    });
});

router.delete('/user/:id', (req,res) => {
    db.query('DELETE from newuser where id = ?',[req.params.id],(err,result) => {
        if(err) throw err;

        res.redirect('/viewuser');
        
    });
})

module.exports = router;