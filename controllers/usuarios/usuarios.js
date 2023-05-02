'use strict';


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const moduloUsuarios = require('../.././models/usuarios/usuarios');

const secretKey = config.secret;


async function getUserByUsername(name) {
    return moduloUsuarios.get.byUsername(name);
}

async function comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}

function generateToken(user) {
    return jwt.sign({ id: user.id, name: user.name }, config.secret, {
        expiresIn: '2h',
    });
}
function checkUserCredentials(name, password) {
    return moduloUsuarios.get.checkUserCredentials(name, password);
}
// Middleware para verificar el token JWT
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.user = decoded;
        next();
    });
}



module.exports = {
    getUserByUsername,
    comparePassword,
    generateToken,
    checkUserCredentials: moduloUsuarios.get.checkUserCredentials,
};