var router = require('express').Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
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
    })
})

// route insert data
router.post('/users', (req, res)=>{
    // console.log("wkwkwkwk")
    // console.log(req.body)
    var kirim = 'insert into users set ?'
    var dataUser = { 
        firstname: req.body.firstname,
        lastname: req.body.lastname, 
        email: req.body.email,
        phonenumber: req.body.phoneNumber,
        password: req.body.password,
        state: req.body.state,
        city: req.body.city,
        zipcode: req.body.zipcode,
        address: req.body.address,
        profilePicture: "default"
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
        if(err) {
            res.send({"status": "Failed"})
        }
        else if (result.length > 0){
            res.send({"status": "alreadyExist"});
        } 
        else {
            res.send({"status": "registerSuccess"})
        }
        // console.log(result);
    })
})

// route POST data LOGIN !
router.post('/login', (req, res) => {
    var sql = `select * from users where username = '${req.body.email}' or email = '${req.body.email}'`;
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
                res.send({"status": "LoginSukses!"})
            }
        }
    })
})

// route put/update data user by id
router.put('/users/:id', (req, res)=>{
    var update = 'update users set ? where UserID = ?'
    var dataUser = { 
        firstname: req.body.firstname,
        lastname: req.body.lastname, 
        email: req.body.email,
        phonenumber: req.body.phoneNumber,
        // password: req.body.password,
        state: req.body.state,
        city: req.body.city,
        zipcode: req.body.zipcode,
        address: req.body.address,
        profilePicture: req.body.profilePicture
    }
    
    db.query(update, [dataUser, req.params.id], (err, result)=>{
        if(err) throw err;
        // console.log(result);
        res.send(req.params.id)
    });
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

module.exports = router;