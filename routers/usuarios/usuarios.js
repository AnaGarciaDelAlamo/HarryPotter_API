'use strict';

const router = require('express').Router();
const controladorUsuarios = require('../.././controllers/usuarios/usuarios');


router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await controladorUsuarios.checkUserCredentials(name, password);
        if (user.length > 0) {
            res.json({ success: true, message: 'Usuario autenticado' });
        } else {
            res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al intentar autenticar al usuario', error });
    }
});



module.exports = router;