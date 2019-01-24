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

// route get all data user
router.get('/user', (req, res)=>{
    var ambil = 'select * from user';
    db.query(ambil, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

// route get specific data by id
router.get('/user/:id', (req, res)=>{
    var ambil = 'select * from user where id = ?';
    db.query(ambil, req.params.id, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

// route insert data
router.post('/user', (req, res)=>{
    console.log(req.body)
    var kirim = 'insert into user set ?'
    var dataUser = { 
        firstname: req.body.firstname,
        lastname: req.body.lastname, 
        email: req.body.email,
        phonenumber: req.body.phoneNumber,
        password: req.body.password,
        company: req.body.company,
        country: req.body.country,
        city: req.body.city,
        zipcode: req.body.zipcode,
        address1: req.body.address1,
        address2: req.body.address2
    }
    db.query(kirim, dataUser, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send({
            firstname: req.body.firstname,
            lastname: req.body.lastname, 
            email: req.body.email,
            phonenumber: req.body.phoneNumber,
            password: req.body.password,
            company: req.body.company,
            country: req.body.country,
            city: req.body.city,
            zipcode: req.body.zipcode,
            address1: req.body.address1,
            address2: req.body.address2,
            status: 'Data terkirim!'
        })
    });
})

// route put/update data user by id
router.put('/user/:id', (req, res)=>{
    var update = 'update user set ? where id = ?'
    var dataUser = { 
        firstname: req.body.firstname,
        lastname: req.body.lastname, 
        email: req.body.email,
        phonenumber: req.body.phoneNumber,
        password: req.body.password,
        company: req.body.company,
        country: req.body.country,
        city: req.body.city,
        zipcode: req.body.zipcode,
        address1: req.body.address1,
        address2: req.body.address2
    }
    
    db.query(update, [dataUser, req.params.id], (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send({
            status: `Data ke - ${req.params.id} sukses terupdate!`
        })
    });
})

// delete data user by id
router.delete('/user/:id', (req, res)=>{
    var hapus = 'delete from user where id = ?';
    db.query(hapus, req.params.id, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send({
            status: `Data ke - ${req.params.id} sukses terhapus!`
        })
    })
})

module.exports = router;