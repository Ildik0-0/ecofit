//iniciar el servidor


const express  = require('express');
const morgan = require('morgan');
const expbhs = require('express-handlebars');


//const { dirname } = require('path');
const path = require('path');
const stripe = require('stripe')("sk_test_51Lz4QNIZq884KCDIyGW5mXIcl2GReFX11NaaQrMd58X3X7QjO5oLNYgz0bCXCO9ZR3V03MZGqToCB6diEv72HXLM00CWHdd6Pp")

const flash = require('connect-flash');//
const session = require('express-session');
const passport =  require('passport');

//DATABASE
const MySQLStore = require('express-mysql-session') (session);
const {database} = require('./keys');
const pool = require('./db');

//PUERTO
//const PORT = require('./config');
const PORT = process.env.PORT || 3000;

//const { prototype } = require('events');

//initlalization
const app = express();
require('./lib/passport');

//setting
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views' ));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('.hbs', expbhs.engine({ 
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
    //add helpers
}));
app.set('view engine', '.hbs');


//Middleware

app.use(session({
    secret: 'textosecreto',
    resave: false,
     saveUninitialized: false,
    store: new MySQLStore (database)
 }));
app.use(flash ());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))//recive lainfo desde el servidor
app.use(express.json()); //para que soporte los archivos json
app.use(passport.initialize());
app.use(passport.session());

//GLOBAL VARIABLES
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');//
    app.locals.user = req.user;
   next(); //toma la info del user y la redireciona para continuar 

});

//Routes
app.use(require('./routes'));
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/admin', require('./routes/admin'));
app.use('/shop', require('./routes/shop'));
app.use('/producto', require('./routes/crudpro'));
app.use('/cliente', require('./routes/cliente'));
app.use('/auth', require('./routes/authentication'));
app.use('/compra', require('./routes/compra'));
app.use('/pago',require('./routes/pago'));


//Static files
app.use(express.static(path.join(__dirname, 'public'))); //donde pueden ir archivos staticos como html y demas




//Start Server

app.listen(PORT);
    console.log('Server on port', PORT);
