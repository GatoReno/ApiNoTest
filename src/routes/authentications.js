//rutas de login


const express = require('express');
const router = express.Router();

const passport = require('passport');
const pool = require('../../db');


router.get('/signup', (req,res) => {

    res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup',{
    succesRedirect: '/porfile',
    falureRedirect : '/signup',
    failureFlash : true
}));

router.get('/porfile',()=>{
    res.send('your porfile');
});

router.get('/signin', (req,res) => {
    res.render('auth/signin');
});


module.exports = router;