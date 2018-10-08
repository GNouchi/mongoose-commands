const BgRoute = "\x1b[45m\x1b[1m%s\x1b[0m";
const FgYellow = "\x1b[33m\x1b[1m";
const BgBlue = "\x1b[44m\x1b[1m\x1b[37m";
const star =()=>console.log(FgYellow,'*'.repeat(50));
const line =(obj)=>console.log(BgBlue,'-'.repeat(50),{obj});

// inject models
const Object = require('./models');

module.exports = 
{
    index:(req,res)=>{console.log(BgRoute,'hit index');
        Object.find({})
            .then((data)=>{console.log(data);
                res.render('index', {data:data});                
            })
            .catch((err)=>{
                res.render('index', {data:err});                
            })
            
    },

    show:(req,res)=>{console.log(BgRoute,'hit show');        
        Object.findById(req.params.id)
                .then((data)=>{console.log(data);
                    res.render('show', {data:data});                
                })
                .catch((err)=>{
                    console.log(err);                    
                    res.render('show', {data:err});                
                })        
    },

    new:(req,res)=>{console.log(BgRoute,'hit new');        
        res.render('new');
    },

    edit:(req,res)=>{console.log(BgRoute,'hit edit');        
        Object.findById(req.params.id)
                .then((data)=>{
                    res.render('edit', {data:data});                
                })
                .catch((err)=>{
                    res.render('edit', {data:err});                
                })        
    },

    destroy:(req,res)=>{console.log(BgRoute,'hit destroy');        
        Object.findByIdAndDelete(req.params.id)
                .then((data)=>{console.log("delete route entered successfully..deleting: ", req.params.id );                    
                    console.log(data);
                })
                .catch((err)=>{console.log("hit errors ==> redirecting:");                    
                })
        res.redirect('/');
    },

    createObj:(req,res)=>{console.log("hit create quote");
        Object.create(req.body, 
            (err, newobj)=>{
                if(err){
                    star();  
                    for(let key in err.errors){
                        console.log(key,'==> :', err.errors[key].message);
//flash & session not imported
                        // req.flash(key, err.errors[key].message); 
                    }
                    res.redirect('/obj/new');
                }
                else{
                    console.log(newobj);
                    console.log("create successful");                                
                    res.redirect('/');
                }
        });
    },

    editObj:(req,res)=>{console.log("hit edit route for id: ", req.params.id);
        Object.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
            .then((obj)=>{console.log("success on edit route");                
            })
            .catch((err)=>{console.log('errors found...again..ಠ_ಠ');
                console.log(err);                
                // req.flash(err, err); 
            })        
        res.redirect('/obj/edit/'+req.params.id);
    },

} 