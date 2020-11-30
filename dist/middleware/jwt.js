"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
const Usuario_1 = require("../entity/Usuario");
exports.checkJwt = (req, res, next) => {
    const token = req.headers['auth'];
    let jwtPayload;
    let newUser = new Usuario_1.Usuario();
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        return res.status(401).send({
            message: 'Ingreso No Autorizado'
        });
    }
    newUser = jwtPayload.usuario;
    //delete newUser['password'];
    console.log('ESTE ES EL PAYLOAD', newUser);
    const newToken = jwt.sign({ usuario: newUser }, config_1.default.jwtSecret, { expiresIn: '1h' });
    res.setHeader('token', newToken);
    next();
};
//# sourceMappingURL=jwt.js.map