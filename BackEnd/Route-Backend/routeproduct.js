var router = require('express').Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
var fileUpload = require('express-fileupload');

router.use(fileUpload());
router.use(bodyParser.json());
router.use(cors());

var productIDTemp = 0;

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'projectakhir',
})

db.connect(()=>{
    console.log('Route Product Terhubung ke MySQL!')
});

// route get all data product
router.get('/products', (req, res)=>{
    var ambil = 'select * from products';
    db.query(ambil, (err, result)=>{
        if(err) throw err;
        // console.log(result);
        res.send(result);
    })
})

// route get specific data product by id
router.get('/products/:id', (req, res)=>{
    var ambil = 'select * from products where productID = ?';
    db.query(ambil, req.params.id, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

// route insert data product
router.post('/products', (req, res)=>{
    var kirim = 'insert into products set ?'
    console.log(req.body)
    var dataProduct = { 
        productname: req.body.productname,
        price: req.body.price, 
        productdesc: req.body.productdesc,
        size: req.body.size,
        color: req.body.color,
        stock: req.body.stock,
        category: req.body.category,
        picture: "default"
    }
    
    db.query(kirim, dataProduct, (err, result)=>{
        if(err) throw err;
        console.log(result);
        
        // untuk dapetin id yang mau dipost fotonya
        productIDTemp = result.insertId;
        console.log(productIDTemp);
        res.send({"productID": productIDTemp});
    });
})

// route put/update data product by id
router.put('/products/:id', (req, res)=>{
    var update = 'update products set ? where productID = ?'
    var dataProduct = { 
        productname: req.body.productname,
        price: req.body.price,
        size: req.body.size,
        color: req.body.color,
        stock: req.body.stock,
        category: req.body.category,
        productdesc: req.body.productdesc
    }
    
    db.query(update, [dataProduct, req.params.id], (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(req.params.id)
    });
})

// delete data product by id
router.delete('/products/:id', (req, res)=>{
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