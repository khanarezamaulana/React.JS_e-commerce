var express = require('express');
var mysql = require('mysql');
var routeruser = require('./Route-Backend/routeuser');
var routerproduct = require('./Route-Backend/routeproduct');
var routerupload = require('./Route-Backend/routeupload');
var cors = require('cors');
var upload = require('express-fileupload')

var app = express();

app.use(routerupload);
app.use(routerproduct);
app.use(routeruser);


app.use(cors());
app.use(upload());
app.use('/file', express.static('storage'))
app.use('/fileproduct', express.static('storageProducts'));

// route 
app.get('/', (req, res)=>{
    res.send('Express ♥ MySQL')
})

// aktivasi server
app.listen(2018, ()=>{
    console.log('Server aktif di port 2018!')
})