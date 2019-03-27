var router = require('express').Router();
var bodyParser = require('body-parser');
var cors = require('cors');
var RajaOngkir = require('rajaongkir-nodejs').Starter('8d3b2a4aa941f4779add2886808a3167');

router.use(bodyParser.json());
router.use(cors())

// route GET all province
router.get('/province', (req, res) => {
    RajaOngkir.getProvinces().then((result) => {
        // console.log(result)
        res.send(result)
    }).catch((err) => {
        console.log(err)
        res.send('erorr')
    })    
})

// route GET all city
router.get('/city', (req, res) => {
    RajaOngkir.getCities().then((result) => {
        // console.log(result)
        res.send(result)
    }).catch((err) => {
        console.log(err)
        res.send(err)
    })    
})

// route GET shipping
router.get('/shipping/:city_id', (req, res) => {
    console.log(req.params.city_id)
    var params = {
        origin: 153, // ID Kota atau Kabupaten Asal (DKI Jakarta)
        destination: req.params.city_id, // ID Kota atau Kabupaten Tujuan
        weight: 1000 // Berat Barang dalam gram (gr)
    };
    RajaOngkir.getJNECost(params).then((result) => {
        // console.log(result)
        res.send(result)
    }).catch((err) => {
        console.log("error")
        // console.log(err)
        res.send(err)
    })
})

// route GET province berdasarkan province_id dari API Raja Ongkir
router.get('/province/:province_id', (req, res) => {
    console.log(req.params.province_id)
    var id = req.params.province_id
    RajaOngkir.getProvince(id).then((result) => {
        console.log(result)
        res.send(result)
    }).catch((err) => {
        console.log('error')
    })
})

// route GET city_id berdasarkan city_id dari API Raja Ongkir
router.get('/city/:city_id', (req, res) => {
    console.log(req.params.city_id)
    console.log('cityid')
    RajaOngkir.getCity(req.params.city_id).then((result) => {
        console.log(result)
        res.send(result)
    }).catch((err) => {
        console.log('error')
    })
})

module.exports = router;

