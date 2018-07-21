// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var dbconfig = require('../database/db');
// var connection = mysql.createConnection(dbconfig.connection);

// connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
module.exports = function(passport) {

    
    // used to serialize the user for the session
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });
    // passport.deserializeUser((id,done)=>{
    // User.findById(id).then(user => done (null,user));
    // });
    // passport.serializeUser(function(user, done) {
    //     done(null, user.id);
    // });

    // // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        dbconfig.query("SELECT * FROM `newuser` WHERE `id` = '" + id + "'", function(err, user){
            done(null, user);
           
        });
    });

   
   

    // =========================================================================
    // LOCAL LOGIN 

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'name',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, name, password, done) { // callback with email and password from our form
            dbconfig.query("SELECT * FROM newuser WHERE name = ?",[name], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('error_msg', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('error_msg', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};