"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Usuario_1 = require("../entity/Usuario");
const config_1 = require("../config/config");
const jwt = require("jsonwebtoken");
class AuthController {
}
AuthController.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { usuario, password } = req.body;
    let clave = password;
    if (!(usuario && clave)) {
        return res.status(400).json({
            message: "Usuario y Password son requeridos"
        });
    }
    ;
    const userRepository = typeorm_1.getRepository(Usuario_1.Usuario);
    //const userRepository = await getRepository(Usuario).createQueryBuilder().select().addSelect('password').getMany();
    let user;
    try {
        user = yield userRepository.findOneOrFail({ where: { usuario } });
    }
    catch (error) {
        return res.status(400).json({
            message: "(Usuario) o Password incorrecto!"
        });
    }
    if (!user.verificarPassword(clave)) {
        return res.status(400).json({
            message: "Usuario o (Password) incorrecto!"
        });
    }
    ;
    const token = jwt.sign({
        userId: user.id_usuario,
        userName: user.nombre
    }, config_1.default.jwtSecret, { expiresIn: '1h' });
    res.json({
        message: 'OK',
        token
    });
});
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map