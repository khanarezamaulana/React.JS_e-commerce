var router = require('express').Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
router.use(bodyParser.json())

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'projectakhir',
})

db.connect(()=>{
    console.log('Terhubung ke MySQL!')
});

// route get all data product
router.get('/product', (req, res)=>{
    var ambil = 'select * from products';
    db.query(ambil, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

// route get specific data product by id
router.get('/product/:id', (req, res)=>{
    var ambil = 'select * from products where productID = ?';
    db.query(ambil, req.params.id, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

// route insert data product
router.post('/product', (req, res)=>{
    var kirim = 'insert into products set ?'
    var dataProduct = { 
        productname: req.body.productname,
        harga: req.body.harga, 
        productdesc: req.body.productdesc,
        size: req.body.size,
        color: req.body.color,
        quantity: req.body.quantity
    }
    
    db.query(kirim, dataProduct, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send({
            productname: req.body.productname,
            harga: req.body.harga, 
            productdesc: req.body.productdesc,
            size: req.body.size,
            color: req.body.color,
            quantity: req.body.quantity,
            status: 'Data terkirim!'
        })
    });
})

// route put/update data product by id
router.put('/product/:id', (req, res)=>{
    var update = 'update products set ? where productID = ?'
    var dataProduct = { 
        productname: req.body.productname,
        harga: req.body.harga, 
        productdesc: req.body.productdesc,
        size: req.body.size,
        color: req.body.color,
        quantity: req.body.quantity
    }
    
    db.query(update, [dataProduct, req.params.id], (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send({
            status: `Data ke - ${req.params.id} sukses terupdate!`
        })
    });
})

// delete data product by id
router.delete('/product/:id', (req, res)=>{
    var hapus = 'delete from products where productID = ?';
    db.query(hapus, req.params.id, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send({
            status: `Data ke - ${req.params.id} sukses terhapus!`
        })
    })
})

module.exports = router;