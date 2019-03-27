var uploadRouter = require("express").Router();
var mysql = require('mysql');
var fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");
var cors = require("cors");

uploadRouter.use(fileUpload());
uploadRouter.use(bodyParser.json())
uploadRouter.use(cors());

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'projectakhir',
})

db.connect(()=>{
    console.log('Route Upload Terhubung ke MySQL!')
});

// Upload Product Picture
uploadRouter.post('/productsupload', (req, res) => {
    console.log(req.body)
    console.log(req.files) 
    var uploadFile = req.files.file
    var namaFile = uploadFile.name
    uploadFile.mv('./storageProducts/' + namaFile, (err) => {
        if(err){
            res.send("error")
        } else {
            console.log("Upload Success !")
            db.query(`update products set picture = 'http://localhost:2018/fileproduct/${namaFile}' where productID = ${req.body.productID};`);
        }
    })
});

// Upload Profile Picture
uploadRouter.post('/usersupload', (req, res) => {
    console.log(req.body)
    console.log(req.files)
    var uploadFile = req.files.file
    var namaFile = uploadFile.name
    uploadFile.mv('./storage/' + namaFile, (err) => {
        if(err){
            res.send("error")
        } else {
            console.log("Upload Success !")
            db.query(`update users set profilePicture = 'http://localhost:2018/file/${namaFile}' where userID = ${req.body.userID};`);
        }
    })
})

// Upload Receipt
uploadRouter.post('/uploadreceipt', (req, res) => {
    console.log(req.body)
    console.log(req.files)
    var uploadFile = req.files.file
    var namaFile = uploadFile.name
    uploadFile.mv('./storageReceipt/' + namaFile, (err) => {
        if(err){
            res.send("error")
        } else {
            console.log("Upload Success !")
            db.query(`update transaction set receipt = 'http://localhost:2018/filereceipt/${namaFile}' where transactionID = ${req.body.transactionID};`);
        }
    })
})

module.exports = uploadRouter;