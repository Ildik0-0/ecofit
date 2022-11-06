const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const pool = require('../db');

//const bodyParser = require('body-parser')
//const app = express();
//app.use(bodyParser.urlencoded({extended:true}));




router.get('/admin', async (req, res)=>{

     res.render('admin/admin');

    //res.render('shop/viewshop');


});

router.post('/admin', async (req, res)=>{
    res.redirect('/admin');
}); 

module.exports = router;

