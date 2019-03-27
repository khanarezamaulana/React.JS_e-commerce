var express = require('express');
var routeruser = require('./Route-Backend/routeuser');
var routerproduct = require('./Route-Backend/routeproduct');
var routerupload = require('./Route-Backend/routeupload');
var routercart = require('./Route-Backend/routecart');
var routeRO = require('./Route-Backend/routeRO');
var cors = require('cors');
var upload = require('express-fileupload')

var app = express();

app.use(routerupload);
app.use(routerproduct);
app.use(routeruser);
app.use(routercart);
app.use(routeRO);


app.use(cors());
app.use(upload());
app.use('/file', express.static('storage'));
app.use('/fileproduct', express.static('storageProducts'));
app.use('/filereceipt', express.static('storageReceipt'));

// route 
app.get('/', (req, res)=>{
    res.send('Express ♥ MySQL')
})

// aktivasi server
app.listen(2018, ()=>{
    console.log('Server aktif di port 2018!')
})