//iniciar el servidor
//import express from 'express';
//import expbhs from 'express-handlebars';
//import path from 'path';
//import stripe from 'stripe';

const express  = require('express');
const expbhs = require('express-handlebars');
//const Pool = require('mysql2/typings/mysql/lib/Pool');
//const { dirname } = require('path');
const path = require('path');
const stripe = require('stripe')("sk_test_51Lz4QNIZq884KCDIyGW5mXIcl2GReFX11NaaQrMd58X3X7QjO5oLNYgz0bCXCO9ZR3V03MZGqToCB6diEv72HXLM00CWHdd6Pp")
const {database} = require('./db');
const pool = require('./db');

//PUERTO
//const PORT = require('./config');
const PORT = process.env.PORT || 3000;

//const { prototype } = require('events');
//initlalization

const app = express();

//setting
app.set('views', path.join(__dirname, 'views' ));
app.engine('.hbs', expbhs.engine({ 
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
//Middleware
app.use(express.urlencoded({extended: false}))//recive lainfo desde el servidor
app.use(express.json()); //para que soporte los archivos json

//Routes
app.use(require('./routes'));
app.use(require('./routes/index'));
app.use('/shop', require('./routes/shop'));


//Static files
app.use(express.static(path.join(__dirname, 'public'))); //donde pueden ir archivos staticos como html y demas




//Start Server

app.listen(PORT);
    console.log('Server on port', PORT);
