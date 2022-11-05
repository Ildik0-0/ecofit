const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const pool = require('../db');

//const bodyParser = require('body-parser')
//const app = express();
//app.use(bodyParser.urlencoded({extended:true}));




router.get('/viewshop', async (req, res)=>{

    const {id} = req.params;
    const viewtodo = await pool.query('SELECT * FROM productos');
    //const viewtodo = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    console.log(viewtodo);
    console.log(id);
    
     res.render('shop/viewshop', {viewtodo});

    //res.render('shop/viewshop');


});

router.post('/viewshop', async (req, res)=>{


   

    res.redirect('/shop/viewshop');
}); 









module.exports = router;