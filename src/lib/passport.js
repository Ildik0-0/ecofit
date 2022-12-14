//const { request } = require('express');
//const { Passport } = require('passport');
//const e = require('connect-flash');
const funciones = require('../routes/funciones')
const { body, validationResult } = require('express-validator');
const express = require('express');
const app = express();
const flash = require('connect-flash');
let session = require('express-session')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../db');
const helpers = require('../lib/helpers');


passport.use('local.signin', new LocalStrategy ({
   usernameField: 'usuario',
   passwordField: 'pass',
   passReqToCallback: true
}, async  (req, usuario, pass, done) =>{
   console.log(req.body);
  const rows = await pool.query('SELECT * FROM usuarios Where usuario = ?', [usuario]);
   
  //aqui se valida el password

  if(rows.length > 0){
      const user = rows[0];
      const validPassword = await helpers.matchPassword(pass, user.pass);
      const error = validationResult(req);
   
      if(validPassword){
         done(null, user, req.flash('success', 'Welcome ' + user.usuario));
      }else{
         done(null, false, req.flash('message', 'contraseña mala'));
         
      }
     
  }else{
   return done(null, false, req.flash('message', 'El usuario no existe amigo'));
  }
}));

passport.use('local.signup', new LocalStrategy ({
   usernameField: 'usuario',
   passwordField: 'pass',
   passReqToCallback: true
   
}
,async (req, usuario, pass, done) =>{
 
const {nom_usuario} = req.body;
let {email} = req.body
      let emailuser = funciones.validarEmail(email);
        
        console.log(email);
        

   if (emailuser == true){
      console.log('valido');
   }else{
      console.log('email invalid')
         //req.flash('message', 'La dirección de email es incorrecta')
         //return res.redirect('/signup')
   };

email= emailuser;

const newUser = {
   usuario,
   nom_usuario,
   email,
   pass
};


newUser.pass = await helpers.encryptPassword(pass);
let result = await pool.query('INSERT INTO usuarios SET ?', [newUser]);
newUser.id = result.insertId;
return done(null, newUser);

}));

passport.serializeUser((user, done) =>{
   done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query ('SELECT * FROM usuarios Where id = ?', [id]);
   done(null, rows[0]);//pos¿cion del id
});



