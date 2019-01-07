const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../../db');

const helpers = require('../lib/helpers');

passport.use('local.signup', new LocalStrategy({
    usernameField : 'name',
    passwordField : 'pass',
    passReqToCallback : true
}, async (req,name,pass,mail,role,done) => {
   //console.log(req.body);
    const newUser = {
        name,
        pass,
        mail: req.body.mail ? req.body.mail : '',
        role: req.body.role ? parseInt(req.body.role) : 1,
        status : 1,
        data : ''
        

    };
    newUser.pass = await helpers.encryptPass(pass);
    console.log([newUser]);
    
    await pool.query('Insert into Users set ?',[newUser]);

}));


//passport.serializeUser();