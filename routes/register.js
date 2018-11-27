/**
 * Created by user on 29/09/2018.
 */
var express = require('express');
var db = require('../data/oracledb/db');

var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    var obj = {err: 0};
    res.render('register', obj);
});

router.post('/', (req, res, next) => {
    //
    // /*router.post('/', (req, res, next) => {
    //  var user=[body.name,bod.....]  */
    // let body = req.body;
    //
    // var user = {
    //     name: body.name,
    //     username: body.username,
    //     email: body.email,
    //     password: body.password,
    //     gender: body.gender,
    //     birthdate: new Date(body.birthdate)
    // };
    console.log(req.body);
    req.body.birthdate = new Date(req.body.birthdate);

    db.saveUser(req.body).then(() => {
            res.redirect('login');
        }
    ).catch((err) => {
        console.log(err);
        res.redirect('register');
    })
});

module.exports = router;
