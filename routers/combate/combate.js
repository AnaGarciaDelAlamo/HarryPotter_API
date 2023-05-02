'use strict'

const router = require('express').Router()
const controladorCombate = require('../.././controllers/combate/combate')


router.get('/:personajeId1/:personajeId2', (req, res, next) => {
    const id1 = req.params.personajeId1
    const id2 = req.params.personajeId2
    controladorCombate.get.byIds(id1, id2)
        .then((personajes) => {
            const [personaje1, personaje2] = personajes;
            pelear(personaje1, personaje2);
            res.send(personajes)
        })
        .catch((err) => next(err))

})

function pelear(personaje1, personaje2) {
    let turno = 1;

    while (personaje1.vida > 0 && personaje2.vida > 0) {
        if (turno % 2 !== 0) {
            // Personaje 1 ataca o cura
            const accion = Math.floor(Math.random() * 2) + 1;
            if (accion === 1) {
                // Ataca
                console.log(`${personaje1.name} ataca a ${personaje2.name} y le quita ${personaje1.fuerza} puntos de vida`);
                personaje2.vida -= personaje1.fuerza;
            } else {
                // Cura
                console.log(`${personaje1.name} se cura ${personaje1.magia} puntos de vida`);
                personaje1.vida += personaje1.magia;
            }
        } else {
            // Personaje 2 ataca o cura
            const accion = Math.floor(Math.random() * 2) + 1;
            if (accion === 1) {
                // Ataca
                console.log(`${personaje2.name} ataca a ${personaje1.name} y le quita ${personaje2.fuerza} puntos de vida`);
                personaje1.vida -= personaje2.fuerza;
            } else {
                // Cura
                console.log(`${personaje2.name} se cura ${personaje2.magia} puntos de vida`);
                personaje2.vida += personaje2.magia;
            }
        }
        turno++;
    }

    // Determinar el ganador
    if (personaje1.vida <= 0 && personaje2.vida <= 0) {
        console.log("¡Es un empate!");
    } else if (personaje1.vida <= 0) {
        console.log(`${personaje2.name} gana la pelea`);
    } else {
        console.log(`${personaje1.name} gana la pelea`);
    }
}
module.exports = router
