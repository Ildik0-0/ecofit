
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



router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', 

[
    body('usuario', 'ingrese nombre de usuario')
            .exists()
            .isLength({min:3}),
    body('nom_usuario', 'ingrese un nombre')
            .exists()
            .isLength({min:3}),
    
    
           
    
    body('pass', 'ingresar una comtraseña'),

    

    ]
    
    
    
    , (req, res, next) =>{
        /*const error = validationResult(req);
        if (!error.isEmpty()){
        res.status(400).json({error: error.array()});
        console.log(error)
        }*/
        const error = validationResult(req);
        let {email} = req.body
        let result = funciones.validarEmail(email);
        
        console.log(result);
        console.log(email);

    if (result == true){
        
       console.log('valido')
    }else{
         req.flash('message', 'La dirección de email es incorrecta')
         return res.redirect('back')
    }



       /* var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if(!expr.test('email')){
            req.flash('message','Ingrese un email valido')
          return  res.redirect('/signup');
        }

       if (!error.isEmpty()){
            console.log(req.body)
           
            const valor = req.body;
            const validaciones = error.array()
            req.flash('message','Todos los campos se encuentran vacio, por favor ingrese sus datos')
          return  res.redirect('/signup');
          
         
            
        }else{
            req.flash('success', 'todo bien')
        }      

        
    }*/


}



 , passport.authenticate('local.signup', {
  
    successRedirect: 'auth/perfil',
    failureRedirect: '/signup',
    failureFlash: true

}));


router.get('/signin',   (req, res) => {
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