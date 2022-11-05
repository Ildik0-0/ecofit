const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const pool = require('../db');





router.get('/addpro', (req, res)=>{
    res.render('producto/addpro');
});

router.post('/addpro', async (req, res)=>{

    const { nom_producto, precio_producto, tipo_producto, stock_producto, descripcion } = req.body;

        const newproducto = { nom_producto, precio_producto, tipo_producto, stock_producto, descripcion };
        await pool.query('INSERT INTO productos set ?', [newproducto]);
       req.flash('success', 'El Producto ha sido agregado');//mensajes para mostrar cuando se agregue un nuevo producto


    res.redirect('/producto');
});

//mostrar
router.get('/', async (req, res) => {

    const viewproducto = await pool.query('SELECT * FROM productos');
     console.log(viewproducto);
    
     res.render('producto/viewpro', {viewproducto});
 
 });


//ELIMINAR

router.get('/delete/:id', async (req, res) => {
    const {id} =req.params;
    await pool.query('DELETE FROM productos WHERE ID = ?', [id]);
    req.flash('success', 'Se elimino correctamenete' )
    res.redirect('/producto');
    
    console.log(req.path.id); //cuando se envia el link para borrar el id lo identifca
   //res.send('DELETED');
});

 //EDITAR 


 router.get('/edit/:id', async (req, res) => { //crud para  editar desde la tabla productos y lo seleciona desde el id
    const {id} = req.params;
    const editproducto = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    
    res.render('producto/editpro', {editproducto: editproducto[0]});
});
router.post('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const {nom_producto, precio_producto, tipo_producto, 
        stock_producto, descripcion} = req.body;
    const newedit = {
        nom_producto, precio_producto, 
        tipo_producto, stock_producto,
         descripcion
    };
    await pool.query('UPDATE productos set ? WHERE id = ?', [newedit, id]);
    req.flash('success', 'El Producto ha sido editado');
    res.redirect('/producto');
});






module.exports = router;