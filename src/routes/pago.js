//rutas oredefinadas 
const {Router, application} = require('express');
const  router = Router();
const stripe = require('stripe')('sk_test_51Lz4QNIZq884KCDIyGW5mXIcl2GReFX11NaaQrMd58X3X7QjO5oLNYgz0bCXCO9ZR3V03MZGqToCB6diEv72HXLM00CWHdd6Pp')
const pool = require('../db');
const express = require('express');

//const app = express();



router.get('/pago', (req, res) =>{
    res.render('pago/pago');
}); 


router.post('/pago', async (req, res)=>{////aqui deber ir pago

    //const vi = await pool.query('SELECT valor_venta, cantidad_venta, nombre_producto FROM ventas WHERE id = producto_id');
    //console.log(vi)

    res.redirect('/pago')
})
//Mostrar Datos epesificos desde la base de datos
router.get('/', async (req, res) => {// solamente /compra
    const {id} = req.params;
    const vi = await pool.query('SELECT * FROM ventas');
    console.log(vi)
     res.render('pago/pago', {vi});
     //res.render('compra/viewcompra', {viewtodo});
 
 });











 router.get('/edit/:id', async (req, res) => { //crud para  editar desde la tabla productos y lo seleciona desde el id

    const {id} = req.params;
    
    const npago = await pool.query('SELECT * FROM ventas WHERE id = ?', [id]);
    console.log(n)
    
    res.render('pago/pago', {npago: npago[0]});
      
    });
    
    router.post('/edit/:id', async (req, res) => {
   
        console.log('entramos en pago')
      const {id} = req.params;

      let {valor_venta, cantidad_venta, nombre_producto} = req.body;   
      
      console.log(valor_venta, cantidad_venta, nombre_producto)
     let ok = {
          valor_venta, cantidad_venta, nombre_producto
      };
      //-----
     await pool.query('SELECT valor_venta, cantidad_venta, nombre_producto FROM ventas WHERE id = ?', [id]);
      console.log(ok)
         
           //
      //-----------------------------------------------------------------------------------------------
      
      
          res.redirect('/pago');
      });
      
router.get('/purchase', (req, res) =>{
        res.render('pago/pago');
}); 
    
    
router.post('/purchase', async (req, res)=>{
    
console.log(req.body)
      //let {valor_venta} = req.body
      console.log(req.body);
      const customer = await stripe.customers.create({
          email: req.body.stripeEmail,
          source: req.body.stripeToken
      });
  
      const charge = await stripe.charges.create({
          amount: '3000',
          currency: 'usd',
          customer: customer.id,
          description : 'No ferroso'
      });
      console.log(charge.id);
      res.redirect('/shop')


});
    


module.exports = router;