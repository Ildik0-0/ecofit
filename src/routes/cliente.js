const funciones = require('./funciones')
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../db');
const flash = require('connect-flash');


router.get('/addclient',(req, res) =>{
    res.render('cliente/addclient')//proveedor
});

router.post('/addclient', 


async (req, res, next)=>{
    
    //let {email_cliente} = req.body
   
    let {nom_proveedor,
        cantidad_articulo,
        email_proveedor,
        telefono_proveedor,
        valor_compra,
        direccion_proveedor,
        contacto_proveedor,
        articulo} = req.body;

/*
    let {nom_cliente, apellido_cliente, email_cliente, telefono_cliente,
        rut_cliente, direccion_cliente, contacto_cliente, secreto} = req.body;*/
         
   
    
          //  let rut = funciones.checkRut(rut_cliente);

    /*if(!/^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/.test('telefono_cliente')){
        req.flash('message','Ingrese un numero valido')
     return res.redirect('back');
    }else{
        req.flash('success', 'todo bien')
    }*/
   
    
let resultphone = funciones.validatePhone(telefono_proveedor);
console.log(resultphone);
   if (resultphone == true){
    
        console.log('numero valido')
    }else{
          req.flash('message', 'El numero telefonico es incorrecta')
          return res.redirect('back')
    }

   
    
   
let result = funciones.validarEmail(email_proveedor);
if (result == true){
    
   console.log('valido')
}else{
     req.flash('message', 'La dirección de email es incorrecta')
     return res.redirect('back')
}


/*if (rut == true){
    
    console.log('valido')
 }else{
      req.flash('message', 'El rut es incorrecta')
      return res.redirect('back')
 }
        

console.log(result);
console.log(resultphone);

    const error = validationResult(req);
    if (!error.isEmpty()){
        console.log(error)
        console.log(req.body)
   //return res.status(400).json({error: error.array()});
    
    }*/


    const newregistro = {
        nom_proveedor,
        cantidad_articulo,
        email_proveedor,
        telefono_proveedor,
        valor_compra,
        direccion_proveedor,
        contacto_proveedor,
        articulo
        
           
        };
   
           await pool.query('INSERT INTO proveedores set ?', [newregistro]);
           req.flash('success', 'Nuevo Proveedor agregado');
          
            res.redirect('/cliente');
});

router.get('/', async (req, res) => {///esto es para que se pueda ver la vista /cliente

    const viewproducto = await pool.query('SELECT * FROM proveedores');
     
     res.render('cliente/viewclient', {viewproducto});
 
 });

 //DELETE 
 router.get('/delete/:id', async (req, res) => {
    const {id} =req.params;
    await pool.query('DELETE FROM proveedores WHERE ID = ?', [id]);
   req.flash('success', 'Se elimino proveedores correctamenete' )
    res.redirect('/cliente');
    
    //console.log(req.path.id); //cuando se envia el link para borrar el id lo identifca
   // res.send('DELETED');
});

// editar cliente
router.get('/edit/:id', async (req, res) => { //crud para  editar desde la tabla productos y lo seleciona desde el id
    const {id} = req.params;
    const editpro = await pool.query('SELECT * FROM proveedores WHERE id = ?', [id]);
   
    res.render('cliente/editclient', {editpro: editpro[0]});
});
router.post('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const {nom_proveedor,
        cantidad_articulo,
        email_proveedor,
        telefono_proveedor,
        valor_compra,
        direccion_proveedor,
        contacto_proveedor,
        articulo} = req.body;
    const newpro = {
        nom_proveedor,
        cantidad_articulo,
        email_proveedor,
        telefono_proveedor,
        valor_compra,
        direccion_proveedor,
        contacto_proveedor,
        articulo
    };
    console.log(newpro);
    await pool.query('UPDATE proveedores set ? WHERE id = ?', [newpro, id]);
    req.flash('success', 'El Proveedor ha sido editado');
    res.redirect('/cliente');
});


module.exports= router;