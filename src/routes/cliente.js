const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../db');
const flash = require('connect-flash');
const { validateRUT, getCheckDigit, generateRandomRUT } = require('validar-rut')

router.get('/addclient',(req, res) =>{
    res.render('cliente/addclient')
});

router.post('/addclient', 
[
body('nom_cliente', 'vacio')
    .exists()
    .isEmpty(),
body('apellido_cliente' , 'vacio')
    .exists()
    .isEmpty(),
body('rut_cliente', 'vacio')
    .exists()
    .isEmpty(),
    
body('telefono_cliente', 'vacio')
    .exists()
    .isEmpty()
    .isNumeric(),
body('email_cliente', 'vacio')
    .exists()
    .isEmpty()
    .isEmail(),
body('direccion_cliente', 'vacio')
    .exists()
    .isEmpty(),
body('contacto_cliente', 'vacio')
    .exists()
    .isEmpty()

],

async (req, res, next)=>{
    
      
    var tel = /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/ //alg pasa aqui
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;



    if(!tel.test('telefono_cliente')){
        req.flash('message','Ingrese un numero valido')
     return res.redirect('back');
    }else{
        req.flash('success', 'todo bien')
    }

        if(!expr.test('email_cliente')){
            req.flash('message','Ingrese un email valido')
         return res.redirect('back');
        }else{
            req.flash('success', 'todo bien')
        }
        

       if(!tel.test('telefono_cliente')){
            req.flash('message','Ingrese un numero valido')
         return res.redirect('back');
        }else{
            req.flash('success', 'todo bien')
        }

    const error = validationResult(req);
    if (!error.isEmpty()){
        console.log(error)
        console.log(req.body)
   //return res.status(400).json({error: error.array()});
    
    }



    const {nom_cliente, apellido_cliente, email_cliente, telefono_cliente,
        rut_cliente, direccion_cliente, contacto_cliente, secreto} = req.body;
           const newregistro = {
            nom_cliente,
            apellido_cliente,
            email_cliente,
            telefono_cliente,
            rut_cliente,
            direccion_cliente,
            contacto_cliente,
            secreto
               
            };
           await pool.query('INSERT INTO clientes set ?', [newregistro]);
           req.flash('success', 'Nuevo Cliente agregado');
          
            res.redirect('/cliente');
});

router.get('/', async (req, res) => {///esto es para que se pueda ver la vista /cliente

    const viewcliente = await pool.query('SELECT * FROM clientes');
     
     res.render('cliente/viewclient', {viewcliente});
 
 });

 //DELETE 
 router.get('/delete/:id', async (req, res) => {
    const {id} =req.params;
    await pool.query('DELETE FROM clientes WHERE ID = ?', [id]);
   req.flash('success', 'Se elimino cliente correctamenete' )
    res.redirect('/cliente');
    
    //console.log(req.path.id); //cuando se envia el link para borrar el id lo identifca
   // res.send('DELETED');
});

// editar cliente
router.get('/edit/:id', async (req, res) => { //crud para  editar desde la tabla productos y lo seleciona desde el id
    const {id} = req.params;
    const editcliente = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
   
    res.render('cliente/editclient', {editcliente: editcliente[0]});
});
router.post('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const {nom_cliente, apellido_cliente, email_cliente, telefono_cliente,
        rut_cliente, direccion_cliente, contacto_cliente} = req.body;
    const neweditcliente = {
        nom_cliente, apellido_cliente, 
        email_cliente, telefono_cliente,
        rut_cliente, direccion_cliente, contacto_cliente
    };
    console.log(neweditcliente);
    await pool.query('UPDATE clientes set ? WHERE id = ?', [neweditcliente, id]);
    req.flash('success', 'El cliente ha sido editado');
    res.redirect('/cliente');
});


module.exports= router;