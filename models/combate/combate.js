'use strict'

const config = require('config').database
const mysql = require('mysql2')

const pool = mysql.createPool({
    ...config,
    connectionLimit: 10
})

function query(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, res, fields) => {
            if (err) {
                console.log('ERROR DB', err)
                reject(err)
                return
            }
            console.log('Fields', fields)
            console.log('Resultados', res)
            resolve(res)
        })
    })
}

async function getPersonaje(id) {
    return query('SELECT * FROM personajes WHERE id = ?', [id])
}


async function getPersonajes(id1, id2) {
    return query('SELECT * FROM personajes WHERE id IN (?, ?)', [id1, id2])
}

module.exports = {
    get: {
        byId: getPersonaje,
        byIds: getPersonajes
    }
}
