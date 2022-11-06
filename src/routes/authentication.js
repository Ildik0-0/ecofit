
const funciones = require('./funciones')
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} =  require('../lib/auth');
const { body, validationResult} = require('express-validator');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
app.use(express.urlencoded({extended: true}));



router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', 

passport.authenticate('local.signup', {
  
    successRedirect: 'auth/perfil',
    failureRedirect: '/signup',
    failureFlash: true

}));


router.get('/signin', isNotLoggedIn,  (req, res) => {
    res.render('auth/signin');
});




router.post('/signin', (req, res, next) =>{   
    
   

    passport.authenticate('local.signin', {
        successRedirect: 'auth/perfil',
        failureRedirect: '/signup',
        failureFlash: true           
   
    })(req, res, next)
   

    });

    router.get("/logout", (req, res, next) => {//funcion asincroma

        req.logOut(req.user, err => {
    
            if(err) return next(err);
    
            res.redirect("/signin");  
    
        });
    
    });

    router.get('/perfil', (req, res)=>{
        res.render('auth/perfil')
    });

module.exports = router;