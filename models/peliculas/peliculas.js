'use strict'

const config = require('config').database
const mysql = require('mysql2')

const pool = mysql.createPool({
    ...config,
    connectionLimit: 10
})

function query(sql, params) {
    return new Promise( (resolve, reject) => {
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
    } )
}

const harrypotterdb = []

function addPelicula(pelicula) {
    harrypotterdb.push(pelicula)
}
function getPeliculas() {
    return query('SELECT * FROM peliculas')
}
function getPelicula(id) {
    return query('SELECT * FROM peliculas WHERE id = ?', [id])
}

function getPersonajesByPelicula(idPelicula) {
    return query('SELECT p.* FROM personajes p JOIN pelicula_personajes pp ON p.id = pp.idPersonaje WHERE pp.idPelicula = ?', [idPelicula]);
}

module.exports = {
    get: {
        all: getPeliculas,
        byId: getPelicula,
        byPeliculaId: getPersonajesByPelicula

    },
    add: addPelicula
}