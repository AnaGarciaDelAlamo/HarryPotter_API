'use strict'

const moduloPeliculas = require('../.././models/peliculas/peliculas')

module.exports = {
    get: {
        all: moduloPeliculas.get.all,
        byId: moduloPeliculas.get.byId,
        byPeliculaId: moduloPeliculas.get.byPeliculaId

    },
    add: moduloPeliculas.add
}