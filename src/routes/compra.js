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
    const compratotal = await pool.query('SELECT * FROM productos');
    //const viewtodo = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    //console.log(viewtodo);
    //console.log(id);
    
     res.render('compra/viewcompra', {compratotal});
     //res.render('compra/viewcompra', {viewtodo});
 
 });


router.get('/compra', (req, res)=>{
    res.render('compra/compra');
});

router.post('/compra', async (req, res)=>{

    /*const {nomcom, nomstock, nompre, nomtipo} = req.body
    const  view = {nomcom, nomstock, nompre, nomtipo};
    console.log(' mostrar los name' ,view)*/

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

    /*const {nomcom, nomstock, nompre, nomtipo} = req.body
    const  view = {nomcom, nomstock, nompre, nomtipo};

    const {nom_producto, precio_producto, tipo_producto, 
        stock_producto, descripcion} = req.body;
    const variable = {nom_producto, precio_producto, tipo_producto, 
        stock_producto, descripcion};*/

   
    
   //undefined
    //let cstock = nomstock;//se ve
    
  console.log("tst: ")
  console.log(' mostrar los name 1' )
    console.log(req.body)


    const compra = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
   
    //const stock = await pool.query('SELECT stock_producto FROM productos')
    
    //console.log(stock , '----------------------' );
    console.log('los que trae compra 1', compra)
    
    
    res.render('compra/compra', {compra: compra[0]});
  
});
router.post('/edit/:id', async (req, res) => {
   
    /*successRedirect: '/',
    failureRedirect: '/compra',
    failureFlash: true
*/
   
    const {id} = req.params;
    
    
    let {nom_producto, precio_producto, tipo_producto, 
          stock_producto, descripcion, nomstock} = req.body;

      
  let spro = stock_producto;
  let nstock = nomstock;

   
    
    console.log( stock_producto , nomstock)
   
   
    if(spro >= nstock && nstock > 0) { 
        
        spro = spro - nstock;

    
    } else{
            
       req.flash('message', "Cantidad es insuficiente");      
    
    } 
    
    
    console.log(spro);
    console.log(nstock);


          console.log('--------------------------------------')

    

stock_producto = spro;
nom_producto =nom_producto;
precio_producto= precio_producto;
descripcion= descripcion;


let newstok = {
    nom_producto, precio_producto, 
    tipo_producto, stock_producto,
    descripcion
};
        

          await pool.query('UPDATE productos set ? WHERE id = ?', [newstok, id]);

    /*await pool.query('SELECT productos set ? WHERE id = ?', [newedit, id]);*/
    //console.log('aqui se recive los value de edit:id2');
    
    
    
    
    //req.flash('success', 'El Producto ha sido editado');
    res.redirect('/compra');
});


       //req.flash('success', 'El Producto ha sido agregado');//mensajes para mostrar cuando se agregue un nuevo producto



    







//ELIMINAR



 //EDITAR 




module.exports= router;