'use strict'

const moduloPersonajes = require('../.././models/personajes/personajes')
const moduloPeliculas = require("../../models/peliculas/peliculas");

module.exports = {
    get: {
        all: moduloPersonajes.get.all,
        byId: moduloPersonajes.get.byId,
        byPersonajeId: moduloPersonajes.get.byPersonajeId
    },
    add: moduloPersonajes.add
}