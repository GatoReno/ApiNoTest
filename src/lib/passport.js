const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../../db');

const helpers = require('../lib/helpers');

passport.use('local.signup', new LocalStrategy({
    usernameField : 'name',
    passwordField : 'pass',
    passReqToCallback : true
}, async (req,name,pass,done) => {
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
        const result = await pool.query('Insert into Users set ?',[newUser]);

        console.log(result);
        newUser.id = result.insertId;
        return done(null,newUser); 

}));


passport.serializeUser((user, done) => {
    done(null,user.id);
});

passport.deserializeUser( async (id,done) => {
    const rows = await pool.query('select * from users where id_user = ?',[id]);
    done(null,rows[0])
    console.log('deserializado'+rows);
});

