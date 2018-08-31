const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const db = require('../database/db');

const { ensureAuthenticated } = require('../helpers/ensureauth')

router.use(fileUpload());

router.post('/', (req,res) => {

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
   if(req.user[0].department === 'ITD'){

   
   db.query(`select ITD from indentcount`, (err,result) => {
    const abc = result[0].ITD+1;
    db.query('update indentcount set ?  where ?',[{ITD:abc},{ITD:abc-1}],(err,result) => {

        const date = new Date();

        db.query('select ITD from indentcount', (err,result) => {

            console.log(req.user[0].department+'/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/' +(date.getMonth()+1) +'/'+result[0].ITD);
            const dude = req.user[0].department+ '/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/'+(date.getMonth()+1) + '/'+result[0].ITD
           
            
             const four1 = req.body.four1;
             const three1 = req.body.three1;
             const abc1 = four1*three1;

             console.log(abc1)
             
             const four2 = req.body.four2;
             const three2 = req.body.three2;
             const abc2 = four2*three2;
             console.log(abc2);

             const four3 = req.body.four3;
             const three3 = req.body.three3;
             const abc3 = four3*three3;
             console.log(abc3)
             var abc4 = 1;
             if(!req.body.one4){
                  abc4 = 0;
              }
              else
              {
             const four4 = req.body.four4;
             const three4 = req.body.three4;
              abc4 = four4*three4;
              }
             console.log(abc4);
                 var abc5  = 1;
            if(!req.body.one5){ abc5 = 0;}
            else{
             const four5 = req.body.four5;
             const three5 = req.body.three5;
             abc5= four5*three5;
            }
            const total = abc1+abc2+abc3+abc4+abc5;
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
                five1:abc1,
                
                one2:req.body.one2,
                two2:req.body.two2,
                three2:req.body.three2,
                four2:req.body.four2,
                five2:abc2,
        
                one3:req.body.one3,
                two3:req.body.two3,
                three3:req.body.three3,
                four3:req.body.four3,
                five3:abc3,

                one4:req.body.one4,
                two4:req.body.two4,
                three4:req.body.three4,
                four4:req.body.four4,
                five4:abc4,

                one5:req.body.one5,
                two5:req.body.two5,
                three5:req.body.three5,
                four5:req.body.four5,
                five5:abc5,

                description:path,
                dpt:req.user[0].department,
                total:total
            }

        
        

            let sql1 = 'INSERT INTO indent SET ?';
    let query1 = db.query(sql1,indent,(err,result) => {
        if(err) throw err;
        db.query('select * from indent where indentno = ?',[dude], (err,result) => {
            res.render('confirm', {
                result:result
            }
        )
    })   
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
 
             console.log(req.user[0].department+'/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/' +(date.getMonth()+1) +'/'+result[0].EIII);
             const dude = req.user[0].department+ '/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/'+(date.getMonth()+1) + '/'+result[0].EIII
             
             const four1 = req.body.four1;
             const three1 = req.body.three1;
             const abc1 = four1*three1;

             console.log(abc1)
             
             const four2 = req.body.four2;
             const three2 = req.body.three2;
             const abc2 = four2*three2;
             console.log(abc2);

             const four3 = req.body.four3;
             const three3 = req.body.three3;
             const abc3 = four3*three3;
             console.log(abc3)
             var abc4 = 1;
             if(!req.body.one4){
                  abc4 = 0;
              }
              else
              {
             const four4 = req.body.four4;
             const three4 = req.body.three4;
              abc4 = four4*three4;
              }
             console.log(abc4);
                 var abc5  = 1;
            if(!req.body.one5){ abc5 = 0;}
            else{
             const four5 = req.body.four5;
             const three5 = req.body.three5;
             abc5= four5*three5;
            }
            const total = abc1+abc2+abc3+abc4+abc5;
            
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
                five1:abc1,
                
                one2:req.body.one2,
                two2:req.body.two2,
                three2:req.body.three2,
                four2:req.body.four2,
                five2:abc2,
        
                one3:req.body.one3,
                two3:req.body.two3,
                three3:req.body.three3,
                four3:req.body.four3,
                five3:abc3,

                one4:req.body.one4,
                two4:req.body.two4,
                three4:req.body.three4,
                four4:req.body.four4,
                five4:abc4,

                one5:req.body.one5,
                two5:req.body.two5,
                three5:req.body.three5,
                four5:req.body.four5,
                five5:abc5,

                description:path,
                dpt:req.user[0].department,
                total:total
            }

 
             let sql1 = 'INSERT INTO indent SET ?';
     let query1 = db.query(sql1,indent,(err,result) => {
         if(err) throw err;
         db.query('select * from indent where indentno = ?',[dude], (err,result) => {
            res.render('confirm', {
                result:result
            }
        ) 
    })  
     })
 
         
           
 })
     })
 });
    }

    else if(req.user[0].department === 'CVO'){
        db.query(`select CVO from indentcount`, (err,result) => {
         const abc = result[0].CVO+1;
         db.query('update indentcount set ?  where ?',[{CVO:abc},{CVO:abc-1}],(err,result) => {
     
             const date = new Date();
     
             db.query('select CVO from indentcount', (err,result) => {
     
                 console.log(req.user[0].department+'/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/' +(date.getMonth()+1) +'/'+result[0].CVO);
                 const dude = req.user[0].department+ '/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/'+(date.getMonth()+1) + '/'+result[0].CVO
                 const four1 = req.body.four1;
                 const three1 = req.body.three1;
                 const abc1 = four1*three1;
    
                 console.log(abc1)
                 
                 const four2 = req.body.four2;
                 const three2 = req.body.three2;
                 const abc2 = four2*three2;
                 console.log(abc2);
    
                 const four3 = req.body.four3;
                 const three3 = req.body.three3;
                 const abc3 = four3*three3;
                 console.log(abc3)
                 var abc4 = 1;
                 if(!req.body.one4){
                      abc4 = 0;
                  }
                  else
                  {
                 const four4 = req.body.four4;
                 const three4 = req.body.three4;
                  abc4 = four4*three4;
                  }
                 console.log(abc4);
                     var abc5  = 1;
                if(!req.body.one5){ abc5 = 0;}
                else{
                 const four5 = req.body.four5;
                 const three5 = req.body.three5;
                 abc5= four5*three5;
                }
                const total = abc1+abc2+abc3+abc4+abc5;
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
                    five1:abc1,
                    
                    one2:req.body.one2,
                    two2:req.body.two2,
                    three2:req.body.three2,
                    four2:req.body.four2,
                    five2:abc2,
            
                    one3:req.body.one3,
                    two3:req.body.two3,
                    three3:req.body.three3,
                    four3:req.body.four3,
                    five3:abc3,
    
                    one4:req.body.one4,
                    two4:req.body.two4,
                    three4:req.body.three4,
                    four4:req.body.four4,
                    five4:abc4,
    
                    one5:req.body.one5,
                    two5:req.body.two5,
                    three5:req.body.three5,
                    four5:req.body.four5,
                    five5:abc5,
    
                    description:path,
                    dpt:req.user[0].department,
                    total:total
                }
    
     
                 let sql1 = 'INSERT INTO indent SET ?';
         let query1 = db.query(sql1,indent,(err,result) => {
             if(err) throw err;
             db.query('select * from indent where indentno = ?',[dude], (err,result) => {
                res.render('confirm', {
                    result:result
                }
            ) 
        })      
         })
     
             
               
     })
         })
     });
        }
        else if(req.user[0].department === 'DGO'){
            db.query(`select DGO from indentcount`, (err,result) => {
             const abc = result[0].DGO+1;
             db.query('update indentcount set ?  where ?',[{DGO:abc},{DGO:abc-1}],(err,result) => {
         
                 const date = new Date();
         
                 db.query('select DGO from indentcount', (err,result) => {
         
                     console.log(req.user[0].department+'/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/' +(date.getMonth()+1) +'/'+result[0].DGO);
                     const dude = req.user[0].department+ '/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/'+(date.getMonth()+1) + '/'+result[0].DGO
                     const four1 = req.body.four1;
             const three1 = req.body.three1;
             const abc1 = four1*three1;

             console.log(abc1)
             
             const four2 = req.body.four2;
             const three2 = req.body.three2;
             const abc2 = four2*three2;
             console.log(abc2);

             const four3 = req.body.four3;
             const three3 = req.body.three3;
             const abc3 = four3*three3;
             console.log(abc3)
             var abc4 = 1;
             if(!req.body.one4){
                  abc4 = 0;
              }
              else
              {
             const four4 = req.body.four4;
             const three4 = req.body.three4;
              abc4 = four4*three4;
              }
             console.log(abc4);
                 var abc5  = 1;
            if(!req.body.one5){ abc5 = 0;}
            else{
             const four5 = req.body.four5;
             const three5 = req.body.three5;
             abc5= four5*three5;
            }
            const total = abc1+abc2+abc3+abc4+abc5;
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
                        five1:abc1,
                        
                        one2:req.body.one2,
                        two2:req.body.two2,
                        three2:req.body.three2,
                        four2:req.body.four2,
                        five2:abc2,
                
                        one3:req.body.one3,
                        two3:req.body.two3,
                        three3:req.body.three3,
                        four3:req.body.four3,
                        five3:abc3,
        
                        one4:req.body.one4,
                        two4:req.body.two4,
                        three4:req.body.three4,
                        four4:req.body.four4,
                        five4:abc4,
        
                        one5:req.body.one5,
                        two5:req.body.two5,
                        three5:req.body.three5,
                        four5:req.body.four5,
                        five5:abc5,
        
                        description:path,
                        dpt:req.user[0].department,
                        total:total
                    }
        
         
                     let sql1 = 'INSERT INTO indent SET ?';
             let query1 = db.query(sql1,indent,(err,result) => {
                 if(err) throw err;
                 db.query('select * from indent where indentno = ?',[dude], (err,result) => {
                    res.render('confirm', {
                        result:result
                    }
                ) 
            })      
             })
         
                 
                   
         })
             })
         });
            }
            else if(req.user[0].department === 'CIVIL'){
                db.query(`select CIVIL from indentcount`, (err,result) => {
                 const abc = result[0].CIVIL+1;
                 db.query('update indentcount set ?  where ?',[{CIVIL:abc},{CIVIL:abc-1}],(err,result) => {
             
                     const date = new Date();
             
                     db.query('select CIVIL from indentcount', (err,result) => {
             
                         console.log(req.user[0].department+'/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/' +(date.getMonth()+1) +'/'+result[0].CIVIL);
                         const dude = req.user[0].department+ '/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/'+(date.getMonth()+1) + '/'+result[0].CIVIL
                         const four1 = req.body.four1;
                         const three1 = req.body.three1;
                         const abc1 = four1*three1;
            
                         console.log(abc1)
                         
                         const four2 = req.body.four2;
                         const three2 = req.body.three2;
                         const abc2 = four2*three2;
                         console.log(abc2);
            
                         const four3 = req.body.four3;
                         const three3 = req.body.three3;
                         const abc3 = four3*three3;
                         console.log(abc3)
                         var abc4 = 1;
                         if(!req.body.one4){
                              abc4 = 0;
                          }
                          else
                          {
                         const four4 = req.body.four4;
                         const three4 = req.body.three4;
                          abc4 = four4*three4;
                          }
                         console.log(abc4);
                             var abc5  = 1;
                        if(!req.body.one5){ abc5 = 0;}
                        else{
                         const four5 = req.body.four5;
                         const three5 = req.body.three5;
                         abc5= four5*three5;
                        }
                        

                        const total = abc1+abc2+abc3+abc4+abc5;
                        
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
                            five1:abc1,
                            
                            one2:req.body.one2,
                            two2:req.body.two2,
                            three2:req.body.three2,
                            four2:req.body.four2,
                            five2:abc2,
                    
                            one3:req.body.one3,
                            two3:req.body.two3,
                            three3:req.body.three3,
                            four3:req.body.four3,
                            five3:abc3,
            
                            one4:req.body.one4,
                            two4:req.body.two4,
                            three4:req.body.three4,
                            four4:req.body.four4,
                            five4:abc4,
            
                            one5:req.body.one5,
                            two5:req.body.two5,
                            three5:req.body.three5,
                            four5:req.body.four5,
                            five5:abc5,
            
                            description:path,
                            dpt:req.user[0].department,
                            total:total
                        }
            
             
                         let sql1 = 'INSERT INTO indent SET ?';
                 let query1 = db.query(sql1,indent,(err,result) => {
                     if(err) throw err;
                     db.query('select * from indent where indentno = ?',[dude], (err,result) => {
                        res.render('confirm', {
                            result:result
                        }
                    ) 
                })     
                 })
             
                     
                       
             })
                 })
             });
                }
                else if(req.user[0].department === 'VIG'){
                    db.query(`select VIG from indentcount`, (err,result) => {
                     const abc = result[0].EIII+1;
                     db.query('update indentcount set ?  where ?',[{VIG:abc},{VIG:abc-1}],(err,result) => {
                 
                         const date = new Date();
                 
                         db.query('select VIG from indentcount', (err,result) => {
                 
                             console.log(req.user[0].department+'/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/' +(date.getMonth()+1) +'/'+result[0].VIG);
                             const dude = req.user[0].department+ '/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/'+(date.getMonth()+1) + '/'+result[0].VIG
                             const four1 = req.body.four1;
             const three1 = req.body.three1;
             const abc1 = four1*three1;

             console.log(abc1)
             
             const four2 = req.body.four2;
             const three2 = req.body.three2;
             const abc2 = four2*three2;
             console.log(abc2);

             const four3 = req.body.four3;
             const three3 = req.body.three3;
             const abc3 = four3*three3;
             console.log(abc3)
             var abc4 = 1;
             if(!req.body.one4){
                  abc4 = 0;
              }
              else
              {
             const four4 = req.body.four4;
             const three4 = req.body.three4;
              abc4 = four4*three4;
              }
             console.log(abc4);
                 var abc5  = 1;
            if(!req.body.one5){ abc5 = 0;}
            else{
             const four5 = req.body.four5;
             const three5 = req.body.three5;
             abc5= four5*three5;
            }
            const total = abc1+abc2+abc3+abc4+abc5;
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
                five1:abc1,
                
                one2:req.body.one2,
                two2:req.body.two2,
                three2:req.body.three2,
                four2:req.body.four2,
                five2:abc2,
        
                one3:req.body.one3,
                two3:req.body.two3,
                three3:req.body.three3,
                four3:req.body.four3,
                five3:abc3,

                one4:req.body.one4,
                two4:req.body.two4,
                three4:req.body.three4,
                four4:req.body.four4,
                five4:abc4,

                one5:req.body.one5,
                two5:req.body.two5,
                three5:req.body.three5,
                four5:req.body.four5,
                five5:abc5,

                description:path,
                dpt:req.user[0].department,
                total:total
            }

                 
                             let sql1 = 'INSERT INTO indent SET ?';
                     let query1 = db.query(sql1,indent,(err,result) => {
                         if(err) throw err;
                         db.query('select * from indent where indentno = ?',[dude], (err,result) => {
                            res.render('confirm', {
                                result:result
                            }
                        ) 
                    })      
                     })
                 
                         
                           
                 })
                     })
                 });
                    }
                    else if(req.user[0].department === 'dept1'){
                        db.query(`select dept1 from indentcount`, (err,result) => {
                         const abc = result[0].EIII+1;
                         db.query('update indentcount set ?  where ?',[{dept1:abc},{dept1:abc-1}],(err,result) => {
                     
                             const date = new Date();
                     
                             db.query('select dept1 from indentcount', (err,result) => {
                     
                                 console.log(req.user[0].department+'/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/' +(date.getMonth()+1) +'/'+result[0].dept1);
                                 const dude = req.user[0].department+ '/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/'+(date.getMonth()+1) + '/'+result[0].dept1
                                 const four1 = req.body.four1;
                                 const three1 = req.body.three1;
                                 const abc1 = four1*three1;
                    
                                 console.log(abc1)
                                 
                                 const four2 = req.body.four2;
                                 const three2 = req.body.three2;
                                 const abc2 = four2*three2;
                                 console.log(abc2);
                    
                                 const four3 = req.body.four3;
                                 const three3 = req.body.three3;
                                 const abc3 = four3*three3;
                                 console.log(abc3)
                                 var abc4 = 1;
                                 if(!req.body.one4){
                                      abc4 = 0;
                                  }
                                  else
                                  {
                                 const four4 = req.body.four4;
                                 const three4 = req.body.three4;
                                  abc4 = four4*three4;
                                  }
                                 console.log(abc4);
                                     var abc5  = 1;
                                if(!req.body.one5){ abc5 = 0;}
                                else{
                                 const four5 = req.body.four5;
                                 const three5 = req.body.three5;
                                 abc5= four5*three5;
                                }
                                
                                const total = abc1+abc2+abc3+abc4+abc5;
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
                                    five1:abc1,
                                    
                                    one2:req.body.one2,
                                    two2:req.body.two2,
                                    three2:req.body.three2,
                                    four2:req.body.four2,
                                    five2:abc2,
                            
                                    one3:req.body.one3,
                                    two3:req.body.two3,
                                    three3:req.body.three3,
                                    four3:req.body.four3,
                                    five3:abc3,
                    
                                    one4:req.body.one4,
                                    two4:req.body.two4,
                                    three4:req.body.three4,
                                    four4:req.body.four4,
                                    five4:abc4,
                    
                                    one5:req.body.one5,
                                    two5:req.body.two5,
                                    three5:req.body.three5,
                                    four5:req.body.four5,
                                    five5:abc5,
                    
                                    description:path,
                                    dpt:req.user[0].department,
                                    total:total
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
                        else if(req.user[0].department === 'dept2'){
                            db.query(`select dept2 from indentcount`, (err,result) => {
                             const abc = result[0].EIII+1;
                             db.query('update indentcount set ?  where ?',[{dept2:abc},{dept2:abc-1}],(err,result) => {
                         
                                 const date = new Date();
                         
                                 db.query('select dept2 from indentcount', (err,result) => {
                         
                                     console.log(req.user[0].department+'/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/' +(date.getMonth()+1) +'/'+result[0].dept2);
                                     const dude = req.user[0].department+ '/' + date.getFullYear() +`-`+ (date.getFullYear()%100+1)+'/'+(date.getMonth()+1) + '/'+result[0].dept2
                                     const four1 = req.body.four1;
                                     const three1 = req.body.three1;
                                     const abc1 = four1*three1;
                        
                                     console.log(abc1)
                                     
                                     const four2 = req.body.four2;
                                     const three2 = req.body.three2;
                                     const abc2 = four2*three2;
                                     console.log(abc2);
                        
                                     const four3 = req.body.four3;
                                     const three3 = req.body.three3;
                                     const abc3 = four3*three3;
                                     console.log(abc3)
                                     var abc4 = 1;
                                     if(!req.body.one4){
                                          abc4 = 0;
                                      }
                                      else
                                      {
                                     const four4 = req.body.four4;
                                     const three4 = req.body.three4;
                                      abc4 = four4*three4;
                                      }
                                     console.log(abc4);
                                         var abc5  = 1;
                                    if(!req.body.one5){ abc5 = 0;}
                                    else{
                                     const four5 = req.body.four5;
                                     const three5 = req.body.three5;
                                     abc5= four5*three5;
                                    }
                                    const total = abc1+abc2+abc3+abc4+abc5;
                                    
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
                                        five1:abc1,
                                        
                                        one2:req.body.one2,
                                        two2:req.body.two2,
                                        three2:req.body.three2,
                                        four2:req.body.four2,
                                        five2:abc2,
                                
                                        one3:req.body.one3,
                                        two3:req.body.two3,
                                        three3:req.body.three3,
                                        four3:req.body.four3,
                                        five3:abc3,
                        
                                        one4:req.body.one4,
                                        two4:req.body.two4,
                                        three4:req.body.three4,
                                        four4:req.body.four4,
                                        five4:abc4,
                        
                                        one5:req.body.one5,
                                        two5:req.body.two5,
                                        three5:req.body.three5,
                                        four5:req.body.four5,
                                        five5:abc5,
                        
                                        description:path,
                                        dpt:req.user[0].department,
                                        total:total
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



module.exports = router;