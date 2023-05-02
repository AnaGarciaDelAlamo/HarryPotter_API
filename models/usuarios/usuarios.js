'use strict';

const config = require('config').database;
const mysql = require('mysql2');

const pool = mysql.createPool({
    ...config,
    connectionLimit: 10,
});

function query(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, res, fields) => {
            if (err) {
                console.log('ERROR DB', err);
                reject(err);
                return;
            }
            console.log('Fields', fields);
            console.log('Resultados', res);
            resolve(res);
        });
    });
}

function addUser(user) {
    return query('INSERT INTO usuarios SET ?', [user]);
}

function getUserByUsername(name) {
    return query('SELECT * FROM usuarios WHERE name = ?', [name]).then(
        (results) => results[0]
    );
}
function checkUserCredentials(name, password) {
    return query('SELECT * FROM usuarios WHERE name = ? AND password = ?', [name, password]);
}

module.exports = {
    add: addUser,
    get: {
        byUsername: getUserByUsername,
        checkUserCredentials,
    },
};