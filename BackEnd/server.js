var express = require('express');
var mysql = require('mysql');
var routeruser = require('./Route-Backend/routeuser');
var routerproduct = require('./Route-Backend/routeproduct');
var cors = require('cors');

var app = express();
app.use(routeruser);
app.use(routerproduct)
app.use(cors());

// route 
app.get('/', (req, res)=>{
    res.send('Express ♥ MySQL')
})

// aktivasi server
app.listen(2018, ()=>{
    console.log('Server aktif di port 2018!')
})