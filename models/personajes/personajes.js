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

function addPersonaje(personaje) {
    harrypotterdb.push(personaje)
}
function getPersonajes() {
    return query('SELECT * FROM personajes')
}
function getPersonaje(id) {
    return query('SELECT * FROM personajes WHERE id = ?', [id])
}

function getPeliculasByPersonajeId(idPersonaje) {
    return query('SELECT p.* FROM peliculas p JOIN pelicula_personajes pp ON p.id = pp.idPelicula WHERE pp.idPersonaje = ?', [idPersonaje]);
}

module.exports = {
    get: {
        all: getPersonajes,
        byId: getPersonaje,
        byPersonajeId: getPeliculasByPersonajeId
    },
    add: addPersonaje
}