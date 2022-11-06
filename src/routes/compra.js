const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const pool = require('../db');
const flash =require('connect-flash');
const bodyParser = require('body-parser')
const urlencodedParser= bodyParser.urlencoded({ extended: false })
const app  = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());





router.get('/viewcompra', (req, res)=>{
    res.render('compra/viewcompra');
});
router.post('/viewcompra', (req, res)=>{




    res.redirect('/compra');
});
router.get('/', async (req, res) => {// solamente /compra
    const {id} = req.params;
    const tbventa = await pool.query('SELECT * FROM ventas');
    //const total = await pool.query('SELECT * FROM compras')
    
    
     res.render('compra/viewcompra', {tbventa});
     //res.render('compra/viewcompra', {viewtodo});
 
 });

/*--------------------------------Inicio De compra---------------------------------------------------------- */
router.get('/compra', (req, res)=>{
    res.render('compra/compra');
});

router.post('/compra', async (req, res)=>{

    

    res.redirect('/compra')
});
   
router.get('/', async (req, res) => {// solamente /compra
    const {id} = req.params;
    const viewtodo = await pool.query('SELECT * FROM productos');
    //const viewtodo = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    //console.log(viewtodo);
    //console.log(id);
    
     res.render('compra/compra', {viewtodo});
     //res.render('compra/viewcompra', {viewtodo});
 
 });

 router.get('/edit/:id', urlencodedParser,  async (req, res) => { //crud para  editar desde la tabla productos y lo seleciona desde el id

   

const {id} = req.params;

    

console.log(' estabos en el inicio del crud 1' )
console.log(req.body)


const compra = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
   
    //const stock = await pool.query('SELECT stock_producto FROM productos')
    
    //console.log(stock , '----------------------' );
console.log('los que trae la compra de producto 1', compra)
    
    
    res.render('compra/compra', {compra: compra[0]});
  
});


router.post('/edit/:id', async (req, res) => {
   
  console.log('entramos en edit')
const {id} = req.params;   
let {nom_producto, precio_producto, tipo_producto, 
    stock_producto, descripcion, cantidad_compra} = req.body;   
let spro = stock_producto;
let nstock = cantidad_compra;
let precio = precio_producto;      
let valor = 0;


    
   // console.log( stock_producto , cantidad_compra)
   console.log('llegamos en el calculo')
  
    if(nstock!= 0 && nstock <= spro && spro > 0) { 
        
        spro = spro - nstock;
        valor= nstock * precio
        console.log(spro)
    
    }else {   
        req.flash('message', "Cantidad es insuficiente, Venta no es pocible");      
        return res.redirect('back')
    
    }
    
  
    console.log('llegamos en el calculo')
    
    console.log(spro);
    //console.log(precio);
    console.log(nstock);

    console.log('--------------------------------------')

    

stock_producto = spro;

nom_producto =nom_producto;
precio_producto= precio_producto;
descripcion= descripcion;
cantidad_compra = nstock;

let newstok = {
    nom_producto, precio_producto, 
    tipo_producto, stock_producto,
    descripcion
};
//-----


        

     await pool.query('UPDATE productos set ? WHERE id = ?', [newstok, id]);
     //
//-----------------------------------------------------------------------------------------------

console.log('estamos en ventas')
const modo_pago = 'credito'; 
let cliente_id;
let cantidad_venta = nstock;
let valor_venta = valor
let producto_id = id;
let nombre_producto = nom_producto;
let venta = {cantidad_venta, valor_venta, nombre_producto ,modo_pago, cliente_id, producto_id}


     await pool.query('INSERT INTO ventas SET ?', [venta] );
    // res.redirect('/shop/viewshop')

    /*await pool.query('SELECT productos set ? WHERE id = ?', [newedit, id]);*/
    //console.log('aqui se recive los value de edit:id2');
    
    
    
    
    //req.flash('success', 'El Producto ha sido editado');
    res.redirect('/compra');
});


       //req.flash('success', 'El Producto ha sido agregado');//mensajes para mostrar cuando se agregue un nuevo producto



    







//ELIMINAR



 //EDITAR 




module.exports= router;