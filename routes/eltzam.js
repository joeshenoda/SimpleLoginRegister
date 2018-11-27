/**
 * Created by user on 30/09/2018.
 */
var express = require('express');
var eltzamatDB = require('../data/oracledb/db');

var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {

    eltzamatDB.getEltzamat()
        .then((eltzamat) => {
            res.render('eltzam', {eltzam: eltzamat});
        }).catch((err) => {
        console.log(err);
    });
});


module.exports = router;