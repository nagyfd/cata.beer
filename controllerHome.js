// This is the home.js file I used for the main controller for my login and register forms


var User = require('../models/user');
var passwordHash=require('password-hash');

module.exports = {
 main: function(req, res) {
  // Check if user exists, increment visits, update last access
  if(req.session.userid){
            User.find({username:req.session.userid},function(err,result){
                console.log(result);
                var data=result[0];
                data.visits++;
                data.lastAccess=Date();
                req.session["visits"]=data.visits;
                req.session["lastAccess"]=data.lastAccess;
                // Update in database
                User.update({username:req.session.userid},{$set:{visits:data.visits,lastAccess:data.lastAccess}},function(err,result){
                    if(err)throw err;
                    console.log(result);
                    res.render('timer',req.session);
                });
            });
        }else{
            res.render('partials/info',req.session);
        }
 },
   // Increment visits, update last access
 about: function(req, res) {
  if(req.session.userid){
            User.find({username:req.session.userid},function(err,result){
                console.log(result);
                var data=result[0];
                data.visits++;
                data.lastAccess=Date();
                req.session["visits"]=data.visits;
                req.session["lastAccess"]=data.lastAccess;
                User.update({username:req.session.userid},{$set:{visits:data.visits,lastAccess:data.lastAccess}},function(err,result){
                    if(err)throw err;
                    console.log(result);
                    res.render('timer',req.session);
                });
            });
        }else{
        res.render('about',req.session);
        }

},
  // Display login page
 loginForm: function(req, res) {
  req.session["errorMessage"]="";
  res.render('loginform',req.session);
},
  // If user is found and password matches, log the user in
loginFormSubmit: function(req, res) {
  var data=req.body;
    User.find({username:data.username},function(err,result){
        if(err) throw err;
        if(result.length==0||!passwordHash.verify(data.password,result[0].password)){
            req.session["errorMessage"]="Invalid username or password. "
            res.render('loginform',req.session);
        }else{
            req.session.userid=data.username;
            res.redirect('/');
        }
    });
 
},
   // Log the user out
 logout: function(req, res) {
            req.session["userid"]="";
            req.session["visits"]="";
            req.session["lastAccess"]="";
            res.redirect('/');
 
},
  // Display register page
 register:function(req,res) {
    res.render('registerform');
},
  // Register new users
 registerSubmit:function(req,res) {
        console.log("register submit");
        var data=req.body;
        var error="Error: ";
        // If username or password too short, update error message
        if(data.username.length<=3||data.password.length<=3){
           error+="Invalid username or password. ";
        }
        // If passwords don't match, update error message
        if(data.password != data.password2){
        error+="The two passwords do not match. ";
        }
        // If email's too short, update error message
        if(data.email.length<=3){
            error+="invalid email. ";
        }
        // If the username is already in the database
        User.find({username:data.username},function(err,result){
            if(err)throw err;
            if(result.length!=0){
                error+="Username already exists. ";
            }
        // If an error exists, display it. Send username back to repopulate field
        if(error.length>12){
            data.username=data.username;
            res.render('registerform', { 
                registererror: error,
                username: data.username
            });
        // Generate hashed password
        } else{
            var hashedPassword=passwordHash.generate(data.password);
            var user= new User({
                username:data.username,
                password:hashedPassword,
                email:data.email                
            });
       // Save user
            user.save(function(err){if(err)throw err;});
            User.find({username:"test"},function(err,result){console.log(result)});
            req.session.userid=data.username;
            res.redirect('/');
        }
         }); 		      
   }
};
