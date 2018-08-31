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

router.post('/editform',(req,res) => {
    const num = req.body.indentno;
    db.query('select * from indent where indentno = ?', [req.body.indentno], (err,result) => {
        res.render('user/editform', {
            result:result
        });
    })
})


router.post('/edit', (req,res) => {

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
        four3:req.body.four3,

        one4:req.body.one4,
        two4:req.body.two4,
        three4:req.body.three4,
        four4:req.body.four4,

        one5:req.body.one5,
        two5:req.body.two5,
        three5:req.body.three5,
        four5:req.body.four5,
        
        description:path,
        dpt:req.user[0].department
    }
  db.query('update indent set ? where ?', [{indentno:req.body.indentno,
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

    one4:req.body.one4,
    two4:req.body.two4,
    three4:req.body.three4,
    four4:req.body.four4,

    one5:req.body.one5,
    two5:req.body.two5,
    three5:req.body.three5,
    four5:req.body.four5,
    
    description:path,
    dpt:req.user[0].department},{indentno:req.body.indentno}], (err,result) => {
      if(err) throw err;

      res.redirect('/dashboard')
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


router.get('/admin/dashboard', ensureAuthenticated,(req,res) => {
    res.render('user/admindashboard')
});



router.delete('/indent/:id', (req,res) => {

    console.log(req.params.id)
//     let sql2 = 'SELECT * FROM indent WHERE id =?';
   
//   var  id = req.params.id;
//     db.query(sql2,[req.params.id],(err,rows) => {
//         if(err) throw err;
       

//  let deldesc = {
//      remarks :req.body.remarks,
//      indentno:rows[0].indentno
//  }

//  db.query('INSERT INTO REMARKS SET ?', deldesc, (err,result) => {
//      if(err) throw err;
     
        db.query('select * from indent where id =? ',[req.params.id], (err,result) => {
            const num =result[0].indentno;
            const name = result[0].name;
            let sql = 'DELETE FROM indent WHERE id =?';
   
    const id = req.params.id
     db.query(sql,[req.params.id],(err,rows) => {
         if(err) throw err;
        if(err) throw err 
        res.render('user/indentwhy', {
             indentno:num,
             name:name
            })
        
    })
    })

//  });
//     });
   
});

router.post('/formremarks', (req,res) => {
    let deldesc = {
             remarks :req.body.remarks,
              indentno:req.body.indentno,
              name:req.body.name
          }
        console.log(req.body.indentno)
          db.query('INSERT INTO REMARKS SET ?', deldesc, (err,result) => {
          if(err) throw err;
          
          res.redirect('/viewall')
          req.flash('succes_msg','Form Deleted')
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

router.post('/viewall', (req,res) => {
    console.log(req.body.department)
    if(req.body.department ==='all')
    {
        if(req.body.fromdate && req.body.todate)
        {
    
        db.query('Select * from indent where date between? and?',[req.body.datefrom,req.body.dateto],(err,result) => {
            if(err) throw err;
            res.render('user/viewall',{
                result:result,
                
                
            })
        });
    }
    }
    else 
    if(req.body.fromdate && req.body.todate)
    {

    if(req.body.department === 'ITD')
        {
        db.query(`Select * from indent where dpt = 'ITD' and date between? and?`,[req.body.datefrom,req.body.dateto],(err,result) => {
            if(err) throw err;
            
            res.render('user/viewall',{
                result:result,
                
                
            })
        });
    }}
    else  if(req.body.fromdate && req.body.todate)
    {

    if(req.body.department === 'EIII')
        {
        db.query(`Select * from indent where dpt = 'EIII' and date between? and?`,[req.body.datefrom,req.body.dateto],(err,result) => {
            if(err) throw err;
            
            res.render('user/viewall',{
                result:result,
                
                
            })
        });
    } }
    else  if(req.body.fromdate && req.body.todate)
    {

        if(req.body.department === 'DGO')
        {
        db.query(`Select * from indent where dpt = 'DGO' and date between? and?`,[req.body.datefrom,req.body.dateto],(err,result) => {
            if(err) throw err;
            
            res.render('user/viewall',{
                result:result,
                
                
            })
        });
    }
}
    else  if(req.body.fromdate && req.body.todate)
    {

        if(req.body.department === 'CVO')
        {
        db.query(`Select * from indent where dpt = 'CVO' and date between? and?`,[req.body.datefrom,req.body.dateto],(err,result) => {
            if(err) throw err;
            
            res.render('user/viewall',{
                result:result,
                
                
            })
        });
    }}
    else
    if(req.body.fromdate && req.body.todate)
    {
 
        if(req.body.department === 'CIVIL')
        {
        db.query(`Select * from indent where dpt = 'CIVIL' and date between? and?`,[req.body.datefrom,req.body.dateto],(err,result) => {
            if(err) throw err;
            
            res.render('user/viewall',{
                result:result,
                
                
            })
        });
    }}
else
    if(req.body.fromdate && req.body.todate)
    {
 
        if(req.body.department === 'Dept1')
        {
        db.query(`Select * from indent where dpt = 'CIVIL' and date between? and?`,[req.body.datefrom,req.body.dateto],(err,result) => {
            if(err) throw err;
            
            res.render('user/viewall',{
                result:result,
                
                
            })
        });
    }}
else
    if(req.body.fromdate && req.body.todate)
    {
 
        if(req.body.department === 'Dept2')
        {
        db.query(`Select * from indent where dpt = 'CIVIL' and date between? and?`,[req.body.datefrom,req.body.dateto],(err,result) => {
            if(err) throw err;
            
            res.render('user/viewall',{
                result:result,
                
                
            })
        });
    }}
    else {
        db.query(`Select * from indent where dpt = ?`,[req.body.department],(err,result) => {
            if(err) throw err;
            
            res.render('user/viewall',{
                result:result,
                
                
            })
        });
    }

})






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
    let sql2 = 'SELECT * FROM newuser WHERE id =?';
   
  
    db.query(sql2,[req.params.id],(err,rows) => {
        if(err) throw err;
       

     const name = rows[0].name;
     const mail = rows[0].emailid;
     const contactno = rows[0].contact_no;

 
     let sql = 'DELETE FROM newuser WHERE id =?';
   
  
     db.query(sql,[req.params.id],(err,rows) => {
         if(err) throw err;
        
         res.render('user/userwhy', {
          name:name,
          mail:mail,
          contactno:contactno
         });
        
     })

 
    });
   
})

router.post('/userremarks', (req,res) => {
    let deldesc = {
             remarks :req.body.remarks,
             mail:req.body.mail,
             name:req.body.name,
             contactno:req.body.contactno
          }
        
          db.query('INSERT INTO userremarks SET ?', deldesc, (err,result) => {
          if(err) throw err;
          res.redirect('/viewuser')
          req.flash('success_msg','User Deleted')
});
});





router.get('/deletedform', ensureAuthenticated,(req,res) => {
    db.query('SELECT * from REMARKS', (err,result) => {
        if(err) throw err;

        res.render('deletedform', {
            result:result
        });
    });
});


router.get('/deleteduser',ensureAuthenticated, (req,res) => {
    db.query('SELECT * from USERREMARKS', (err,result) => {
        if(err) throw err;

        res.render('deleteduser', {
            result:result
        });
    });
});


module.exports = router;