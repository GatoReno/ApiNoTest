//rutas de login


const express = require('express');
const router = express.Router();

const passport = require('passport');
const pool = require('../../db');


router.get('/signup', (req,res) => {

    res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup',{
    successRedirect: '/porfile',
    failureRedirect : '/signup',
    failureFlash : true
}));

router.get('/porfile',(req,res)=>{
    res.send('your porfile');
});

router.get('/signin', (req,res) => {
    res.render('auth/signin');
});


module.exports = router;