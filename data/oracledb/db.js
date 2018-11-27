/**
 * Created by user on 29/09/2018.
 */
"use strict";
const config = require('./config');
const oracledb = require('oracledb');
oracledb.autoCommit = true;
/*
 oracledb.getConnection(config).then(
 (con) => {
 console.log('connected!');
 con.execute(
 `SELECT *
 FROM users
 `)
 .then((res) => console.log(res));

 })
 .catch((err) => {
 console.log(err);
 });
 */
function getResultList(result) {
    var meta = result.metaData;
    var rows = result.rows;

    var ret = [];
    for (let i in rows) {
        var obj = {};
        for (let j in rows[i]) {
            obj[meta[j].name] = rows[i][j];
        }
        ret.push(obj);
    }

    return ret;
}

async function saveUser(user) {
    const con = await
        oracledb.getConnection(config);
    const result = await
        con.execute(`insert into 
     users( ${Object.keys(user).join(',')}) 
     values(:${Object.keys(user).join(',:')})`
            ,
            user
        );
    return result;
}

async function getUser(username) {
    const con = await oracledb.getConnection(config);
    const result = await con.execute(`select * from users where username = '${username}' `
    );
    var goodResult = getResultList(result);
    return goodResult;
}

// var user = {
//     name: 'jo jooooo',
//     username: 'jo',
//     email: 'm.shawara@outlook.com',
//     password: '15987456',
//     gender: 1,
//     birthdate: new Date()
// };
//
//
// saveUser(user)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));

// getUser('shawara')
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));

function hundleEltzam(result) {
    let obj = {};
    const list = result.rows;

    for (let i in list) {
        if (!obj[list[i][2]])
            obj[list[i][2]] = [];
        obj[list[i][2]].push(list[i]);
    }
}

// for(let k in obj)
// console.log(k);

function hundleEltzam(result) {
    let obj = {};
    const list = result.rows;

    for (let i in list) {
        if (!obj[list[i][2]])
            obj[list[i][2]] = [];
        obj[list[i][2]].push(list[i]);
    }

    // for(let k in obj)
    // console.log(k);

    console.log(obj);
}


async function getEltzamat() {
    const con = await oracledb.getConnection(config);

    const result = await con.execute(
        `select OFF_NO , OFF_NAME, (select ELTZAM_NAME FROM KHEDMA.CODES_ELTZAMAT WHERE ELTZAM_CODE= NVL( ELTZAM ,1) ) ,
         TO_CHAR(ELTZAM_DATE_FROM,'YYYY-MM-DD') ,TO_CHAR(ELTZAM_DATE_TO,'YYYY-MM-DD'),NOTES 
         from KHEDMA.OFF_ELTZAMAT 
         where  ELTZAM_DATE_TO >= (select trunc(sysdate)-6 from dual)
         order by  NOTES
         `);

    doRelease(con);
    return result.rows;
}


function doRelease(connection) {
    connection.close(
        function (err) {
            if (err)
                console.error(err.message);
        });
}


module.exports = {
    saveUser: saveUser,
    getUser: getUser,
    getEltzamat: getEltzamat
};