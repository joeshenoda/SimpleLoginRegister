/**
 * Created by user on 29/09/2018.
 */
var express = require('express');
var db = require('../data/oracledb/db');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.tt);
    res.render('login', {title: 'Express'});
});

router.post('/', (req, res, next) => {
    //console.log(req.body);

    db.getUser(req.body.username).then((data) => {
            console.log(data);
            if (data.length > 0 && data.password === req.body.password)
                res.redirect('eltzam');
        }
    ).catch((err) => {
        console.log(err);
        res.redirect('login');
    })
});


module.exports = router;
