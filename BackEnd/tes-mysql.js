var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'projectakhir'
});

db.connect();

// get all data 
// var sql = 'select * from products';
// db.query(sql, (err, result)=>{
//     if(err) throw err;
//     console.log(result);
// });

// get specific data
// var sql = 'select * from products where id = ?'
// db.query(sql, 8, (err, result)=>{
//     if(err) throw err;
//     console.log(result);
// });

// insert data
var data = {
    id: null, 
    firstname: 'Dymas',
    lastname: 'Dendy', 
    email:'dymasdendy@gmail.com',
    phonenumber: 085296116777,
    password: 12345,
    company: 'Sinarmas',
    country: 'Indonesia',
    city: 'Aceh',
    zipcode: 23123,
    address1: 'Jl. Nasional',
    address2: null
}

// var sql = 'insert into user set ?'
// db.query(sql, data, (err, result)=>{
//     if(err) throw err;
//     console.log(result);
// });

// update data
// var sql = 'update user set firstname = ? where id = ?'
// db.query(sql, ["Dendy", 6], (err, result)=>{
//     if(err) throw err;
//     console.log(result);
// });

// delete data
var del = 'delete from user where id = ?'
db.query(del, 8, (err, result)=>{
    if(err) throw err;
    console.log(result);
})