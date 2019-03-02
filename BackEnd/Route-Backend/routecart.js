var router = require('express').Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');

router.use(bodyParser.json());
router.use(cors());

// MySQL connection
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'projectakhir',
})

db.connect(()=>{
    console.log('Route Cart Terhubung ke MySQL!')
});

// route get all data cart
router.get('/cart', (req, res) => {
    var sql = 'select * from carts';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

// route get data cart by id
router.get('/cart/:userID', (req, res) => {
    console.log("wkwkkw")
    console.log(req.params.userID)
    var sql = `select carts.cartID as cartID, carts.productID as productID, users.userId, users.username, products.productname, products.price, products.size, products.color, products.picture, carts.quantity, carts.totalPrice from carts carts join users on carts.userID = users.userID join products on carts.productID = products.productID where carts.userID = ${req.params.userID}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            res.send(result);
        }
    })
})

// route post data to cart
router.post('/cart', (req, res) => {

    // buat ambil harga produknya untuk dapetin total harganya
    var sql = `select * from products where productID = ${req.body.productID}`;
    db.query(sql, (err, result0) => {
        console.log(result0)
        console.log(req.body.productID)
            var userID = req.body.userID;
            var productID = req.body.productID;

            // cek ke carts, kalau produknya udah ada quantity sama total price aja yg update
            var sql = `select * from carts where productID = ${productID} and userID = ${userID}`;
            db.query(sql, (err, result1) => {
                if(result1.length > 0){
                var quantity = result1.quantity;
                var totalPrice = quantity * price;

                // buat dapetin quantity dan totalprice yang baru
                var newQuantity = result1[0].quantity + req.body.quantity;
                var newTotalPrice = result1[0].totalPrice + req.body.totalPrice;
                
                // buat dapetin cartID yang mau di update
                var cartID = result1[0].cartID

                // buat cek new quantity dan new total price
                // console.log(newQuantity)
                // console.log(newTotalPrice)
                
                // data yg mau di update jika produk sudah ada
                var dataUpdate = {
                    quantity: newQuantity,
                    totalPrice: newTotalPrice
                }

                // update quantity dan total price berdasarkan cartID 
                // agar yang terupdate hanya quantity dan total price produk yang di pilih user
                var sql = `update carts set ? where cartID = ${cartID}`;
                db.query(sql, dataUpdate, (err, result2) => {
                    if (err) { 
                        console.log(err)
                    }
                    else {
                        console.log(result2);
                        res.send('Successfully added to cart!')
                    }
                })
            }
            else {
                // post data ke table carts jika produk yang di tambahkan user tidak ada di cart
                var price = result0[0].price;
                var quantityInput = req.body.quantity;
                var totalPrice = quantityInput * price;
                var userID = req.body.userID;
                var productID = req.body.productID;
    
                console.log(req.body.quantity)
                console.log('wkwkwk')
    
                var sql = 'insert into carts (userID, productID, quantity, totalPrice) values (?, ?, ?, ?)';
                db.query(sql, [userID, productID, quantityInput, totalPrice], (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log(result)
                        res.send('Successfully added to cart!')
                    }
                })
            }
        })
    })
})

// delete data carts by cartID
router.delete('/cart/:cartID', (req, res) => {
    console.log(req.params.cartID)
    console.log("wkakaka")
    var cartID = req.params.cartID
    var sql = `delete from carts where cartID = ${cartID}`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.send({
                status: `Data cart - ${req.params.cartID} deleted!`
            })
        }
    })
})

router.delete('/carts/:id_user', (req, res) => {
    let sql = `delete from carts where userID = ${req.params.id_user}`;
    db.query(sql, (err, result) => {
        console.log(result);
        res.send(result);
    })
})

module.exports = router;


