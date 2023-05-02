'use strict'

const router = require('express').Router()
const controladorPersonajes = require('../.././controllers/personajes/personajes')
const controladorPeliculas = require("../../controllers/peliculas/peliculas");
router.get('/', (req, res, next) => {
    controladorPersonajes.get.all()
        .then(personajes => res.send(personajes))
        .catch(err => res.send('ERROR'))
})

router.get('/:idPersonaje', (req, res, next) => {
    controladorPersonajes.get.byId(req.params.idPersonaje)
        .then(personajes => res.send(personajes))
        .catch(err => res.send('ERROR'))
})

router.post('/', (req, res, next) => {
    controladorPersonajes.add(req.body)
    res.send('Personaje almacenado')
})

router.get('/:idPersonaje/peliculas', (req, res, next) => {
    controladorPersonajes.get.byPersonajeId(req.params.idPersonaje)
        .then( (personajes) => res.send(personajes) )
        .catch( (err) => next(err) )


});

module.exports = router