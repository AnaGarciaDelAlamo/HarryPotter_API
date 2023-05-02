'use strict'

const combateModel = require('../.././models/combate/combate')

module.exports = {
    get : {
        byId : combateModel.get.byId,
        byPersonajeId: combateModel.get.byPersonajeId,
        byIds: combateModel.get.byIds
    }

}