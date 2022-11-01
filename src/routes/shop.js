//rutas oredefinadas 
const {Router} = require('express');
const { default: Stripe } = require('stripe');
const  router = Router();
const stripe = require('stripe')('sk_test_51Lz4QNIZq884KCDIyGW5mXIcl2GReFX11NaaQrMd58X3X7QjO5oLNYgz0bCXCO9ZR3V03MZGqToCB6diEv72HXLM00CWHdd6Pp')



router.get('/shop', (req, res) =>{    
    res.render('shop/shop');
});



router.post('/shop', async (req, res)=>{
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
    res.send('received');

});




router.get('/success', (req, res) =>{
    
    res.render('shop/success');
});

router.get('/cancel', (req, res) =>{
    
    res.render('shop/cancel');
});

module.exports = router;