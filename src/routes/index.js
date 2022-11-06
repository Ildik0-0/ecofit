//rutas oredefinadas 
const {Router, application} = require('express');
const  router = Router();

const pool = require('../db');
const express = require('express');

//const app = express();

router.get('/', (req, res) =>{
    res.render('index');
}); 

router.get('/ping', async (req, res) =>{
    const result = await pool.query('SELECT "hello word" as RESULT')
    console.log(result)
    res.json(result[0]);
});

router.get('/create', async (req, res) =>{
    //const result = await pool.query('INSERT INTO usuarios(nom_usuario) VALUE ("JONH")')
    res.json(result)
})

/*router.post('/compra/edit', (req, res)=>{////aqui deber ir pago
    res.redirect('/compra/viewcompra')
})*/

module.exports = router;