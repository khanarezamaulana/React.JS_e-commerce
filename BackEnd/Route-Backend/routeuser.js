var router = require('express').Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');

var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

var fileupload = require('express-fileupload');

router.use(fileupload());
router.use(bodyParser.json());
router.use(cors())

var userIDTemp = 0;

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'projectakhir',
})

db.connect(()=>{
    console.log('Route User Terhubung ke MySQL!')
});

// route get all data users
router.get('/users', (req, res)=>{
    var ambil = 'select * from users';
    db.query(ambil, (err, result)=>{
        if(err) throw err;
        // console.log(result);
        // console.log("ada yg get")
        res.send(result);
    })
})

// route get specific data by id
router.get('/users/:id', (req, res)=>{
    var ambil = `select * from users where userID = ? or username = '${req.params.id}'`;
    db.query(ambil, req.params.id, (err, result)=>{
        if(err) throw err;
        // console.log(result);
        res.send(result);
        console.log(result)
    })
})

// route insert data
router.post('/users', (req, res)=>{
    // console.log("wkwkwkwk")
    console.log(req.body)
    var kirim = 'insert into users set ?'
    var dataUser = { 
        firstname: req.body.firstname,
        lastname: req.body.lastname, 
        email: req.body.email,
        phonenumber: req.body.phoneNumber,
        password: req.body.password,
        country: req.body.country,
        city: req.body.city,
        zipcode: req.body.zipcode,
        address: req.body.address,
        profilePicture: "default",
        province: req.body.province
    }


    db.query(kirim, dataUser, (err, result)=>{
        if(err) throw err;
        // console.log(result);
        
        // untuk dapetin id yang mau di post fotonya
        userIDTemp = result.insertId;
        // console.log(userIDTemp);
        res.send({"userID": userIDTemp});
    });
})

// route POST data SIGNUP !
router.post('/signup', (req, res) => {
    console.log(req.body)

    // cek ke database untuk validasi data yang masuk belum ada di database
    var sql = `select * from users where username = '${req.body.username}' or email = '${req.body.email}'`;
    db.query(sql, (err, result) => {
        if(err) {
            res.send({"status": "Failed"})
        }
        else if (result.length > 0){
            res.send({"status": "alreadyExist"});
        } 
        else {
            // setelah di cek, jika data tidak, maka data user baru masuk ke database 
            var sql =  'insert into users set ?'
            var dataSignup = {
                firstname: req.body.firstname,
                lastname: req.body.lastname, 
                email: req.body.email,
                username: req.body.username,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password
            }
            db.query(sql, dataSignup, (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                    res.send("SignUp Successfully!")
                }
            })
        }
    })
})

// route POST data LOGIN !
router.post('/login', (req, res) => {

    // cek dulu username atau email yang dimasukkin user sudah terdaftar atau belum
    var sql = `select * from users where username = '${req.body.username}' or email = '${req.body.email}'`;
    console.log(req.body)
    db.query(sql, (err, result) => {
        if(err) {throw err;
        }
        else if (result == 0){
            res.send({"status": "AkunBelumTerdaftar"})
        }
        else {
            // console.log(result)
            if (req.body.password != result[0].password){
                console.log('Password Salah!')
                res.send({"status": "PasswordSalah"})
            }
            else {
                console.log('Login Sukses!')
                // console.log(result[0].userID)
                var userID = result[0].userID;
                res.send({"userID" : userID})
            }
        }
    })
})

// route put/update data user by id
router.put('/users/:id', (req, res)=>{
    console.log(req.body)
    var update = `update users set ? where UserID = ${req.params.id}`
    var dataUser = { 
        firstname: req.body.firstname,
        lastname: req.body.lastname, 
        email: req.body.email,
        phonenumber: req.body.phoneNumber,
        // password: req.body.password,
        // country: req.body.country,
        // province: req.body.province,
        // city: req.body.city,
        // zipcode: req.body.zipcode,
        // address: req.body.address,
        profilePicture: req.body.profilePicture,
    }
    
    db.query(update, [dataUser, req.params.id], (err, result)=>{
        if(err) throw err;
        // console.log(result);
        res.send(req.params.id)
    });
})

// route change password user
router.put('/changepassword/:id', (req, res) => {
    console.log(req.params.id)
    var oldPassword = req.body.password;
    var newPassword = req.body.newPassword;
    var sql = `select * from users where userID = ${req.params.id}`;
    
    db.query(sql, (err, result) => {
        if(oldPassword != result[0].password) {
            res.send({"status": "Your old password is wrong!"})
        }
        else {
            var update = `update users set password = '${newPassword}' where userID = ${req.params.id}`;
            db.query(update, (err, result) => {
                if(err) {
                    throw err;
                }
                else {
                    console.log(result)
                    res.send({"status": "Password Changed!"})
                }
            })
        }
    })
})

// route update address di profile (my address)
router.put('/address/:id', (req, res) => {
    console.log(req.body)
    console.log('body')
    var country = req.body.country;
    var province = req.body.province;
    var city = req.body.city;
    var zipcode = req.body.zipcode;
    var address = req.body.address;

    // update data address
    var update = `update users set country = '${country}', province = '${province}', city = '${city}', zipcode = '${zipcode}', address = '${address}' where userID = ${req.params.id}`;
    
    db.query(update, (err, result) => {
        if(err) {
            throw err;
        }
        else {
            res.send(result)
        }
    })
})

// delete data user by id
router.delete('/users/:id', (req, res)=>{
    var hapus = 'delete from users where userID = ?';
    db.query(hapus, req.params.id, (err, result)=>{
        if(err) throw err;
        // console.log(result);
        res.send({
            status: `Data ke - ${req.params.id} sukses terhapus!`
        })
    })
})

// route post data transaction ke table transaction
router.post('/transaction', (req, res) => {
    console.log(req.body);
    var sql = 'insert into transaction set ?';
    var dataTransaction = {
        firstname: req.body.firstname,
        lastname: req.body.lastname, 
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        country: req.body.country,
        province: req.body.province,
        city: req.body.city,
        zipcode: req.body.zipcode,
        address: req.body.address,
        subtotal: req.body.subtotal,
        status: req.body.status
    }
    db.query(sql, req.body, (err, result) => {
        if(err) {
            throw err;
        }
        else {
            console.log(result)

            // nodemailer
            var sender = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'promotion.id2018@gmail.com',
                    type: 'OAuth2',
                    clientId: '5408826303-ru4fh40bkulfd3u38mlmg36kdlcm7dsl.apps.googleusercontent.com',
                    clientSecret: 'nUyDsztB7SByrqlhGxoKNPJC',
                    refreshToken: '1/wf8d_kCwYC_AIIF8-toA4fKh_ue2RzWLLeYrQrIx4tE'
                }
            })
    
            var html = `
            <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <h1>Pro-motion.id</h1>
                </div>
                <div className="col-lg-4">
                    <p className="text-muted">ORDER # ${req.body.transactionID}</p>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <h3>Hai ${req.body.firstname}, terima kasih atas pemesanan anda.</h3>
                        <p>Segera lakukan pembayaran sesuai total biaya Anda, ke rekening kami di bawah ini:</p>
                        <p style="font-style: italic">BCA: 043-095-1475 a/n Khana Reza Maulana</p>
    
                        <p>Jika sudah, konfirmasi pembayaran dengan klik tombol di bawah agar barang Anda bisa langsung kami proses.</p>
            </div>
            <a style="background-color: #0000FF;
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;" href = 'http://localhost:3000/confirmpayment';">Konfirmasi Pembayaran</a> or <a style="text-decoration:none;" href="http://localhost:3000/myorders">Lihat Order</a>
                    </div>
                </div>
            </div>
            `
    
            var myEmail = {
                from: 'Pro-motion.id <promotion.id2018@gmail.com>',
                to: `${req.body.email}`,
                subject: `Pro-motion.id - Invoice Number ${req.body.transactionID} `,
                html: html
            }
    
            sender.sendMail(myEmail, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Email terkirim');
                }
            })

            res.send({"status": "Data transaction berhasil dikirim!"})
        }
    })
})

// router untuk get data table transaction, orders dan products dengan inner join
router.get('/ordersdata', (req, res) => {
    var sql = "SELECT * FROM transaction t INNER JOIN orders o ON t.transactionID = o.invoice INNER JOIN products p ON p.productID = o.productID";
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        else {
            console.log(result)
            res.send(result)
        }
    })
})

// router untuk get data table transaction, orders dan products by userID dengan inner join
router.get('/ordersdata/:id', (req, res) => {
    var sql = `SELECT * FROM transaction t INNER JOIN orders o ON t.transactionID = o.invoice INNER JOIN products p ON p.productID = o.productID WHERE userID = "${req.params.id}"`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        else {
            console.log(result)
            res.send(result)
        }
    })
})

// router untuk get table transaction, orders dan products by transactionID dengan inner join
router.get('/ordersdetail/:id', (req, res) => {
    var sql = `SELECT * FROM transaction t INNER JOIN orders o ON t.transactionID = o.invoice INNER JOIN products p ON p.productID = o.productID WHERE transactionID = "${req.params.id}"`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        else {
            console.log(result)
            res.send(result)
        }
    })
})

// router untuk get data table transaction dan table orders dengan inner join
router.get('/transaction/:userID', (req, res) => {
    var sql = `select * from transaction t inner join orders o on t.transactionID = o.invoice where o.userID = '${req.params.userID}'`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        else {
            console.log(result);
            res.send(result)
        }
    })
})

// post data ke table order
router.post("/order", (req, res) => {
    let sql = `insert into orders set ?`
    db.query(sql, req.body, (err, result) => {
        console.log(result);
        res.send(result);
        
    })
})

// route update receipt table transaction 
router.post("/receipt", (req, res) => {
    let bankname = req.body.namaBank;
    let nameofbankaccount = req.body.pemilikRekening;
    let numberofaccount = req.body.nomorRekening;
    let amountoftransfer = req.body.jumlahTransfer;
    let receipt = "default"
    let sql = `UPDATE transaction SET receipt = '${receipt}', bankname = '${bankname}', nameofbankaccount = '${nameofbankaccount}', numberofaccount = '${numberofaccount}', amountoftransfer = '${amountoftransfer}' where transactionID = '${req.body.transactionID}'`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        else {
            console.log(result);
            
            // untuk dapetin id yang mau dipost receiptnya
            transactionIDTemp = result.insertId;
            console.log(transactionIDTemp);
            res.send({"transactionID": transactionIDTemp});
            }
    })
})

// untuk validasi pembayaran
router.post("/pay", (req, res) => {
    // console.log(req.body);
    // console.log('gshshsh')
    let bankname = req.body.namaBank;
    let nameofbankaccount = req.body.pemilikRekening;
    let numberofaccount = req.body.nomorRekening;
    let amountoftransfer = req.body.jumlahTransfer;
    let receipt = "default"
    let sql = `SELECT * FROM transaction where transactionID = '${req.body.transactionID}'`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            console.log(result)
            if (result.length <= 0) {
                res.send({ "status": "orderanTidakDitemukan" });
            }
            else {
                if (result[0].subtotal != req.body.jumlahTransfer) {
                    res.send({
                        "status": "jumlahTransferTidakSesuai"
                    });
                }
                else {
                    let sql = `UPDATE transaction SET status = "Paid", receipt = '${receipt}', bankname = '${bankname}', nameofbankaccount = '${nameofbankaccount}', numberofaccount = '${numberofaccount}', amountoftransfer = '${amountoftransfer}' where transactionID = '${req.body.transactionID}'`;
                    db.query(sql, (err, response) => {
                        if(err){
                            throw err;
                        }
                        else {
                            res.send({ "status": "Success" });

                            // untuk dapetin id yang mau dipost receiptnya
                            // transactionIDTemp = result.insertId;
                            // console.log(transactionIDTemp);
                            // res.send({"transactionID": transactionIDTemp});
                        }
                    })
                }
            }
        }
    })

})

module.exports = router;