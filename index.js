'use strict'

const peliculas = require('./routers/peliculas/peliculas');
module.exports = peliculas

const personajes = require('./routers/personajes/personajes');
module.exports = personajes

const combate = require('./routers/combate/combate');
module.exports = combate


const usuarios = require('./routers/usuarios/usuarios');
module.exports = usuarios


const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }))
app.use(bodyParser.json({ limit: '1mb' }))



app.use('/personajes', personajes)
app.use('/peliculas', peliculas)
app.use('/combate', combate)

const bodyParser2 = require('body-parser');
app.use(bodyParser2.urlencoded({ extended: true }));
app.use(bodyParser2.json());
app.use('/usuarios', usuarios)


app.listen(3033)

