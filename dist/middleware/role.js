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
exports.checkRole = (roleData) => {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        console.log('RES.LOCALS.JWTPAYLOAD: ', res.locals.jwtPayload);
        const { id_usuario } = res.locals.jwtPayload.usuario;
        const userRepository = typeorm_1.getRepository(Usuario_1.Usuario);
        let user;
        try {
            console.log('ID_USUARIO', id_usuario);
            user = yield userRepository.findOneOrFail(id_usuario);
            console.log("DATA DE USUARIO DE LA BD: ", user);
        }
        catch (error) {
            return res.status(401).send({ message: 'No cuenta con las credenciales necesarias' });
        }
        //check
        const { role } = user;
        console.log('EL ROLE DE LA BASE DE DATOS ES ', role);
        console.log('EL ROLE PARAMETRO ES ', roleData);
        if (roleData === role) {
            next();
        }
        else {
            res.status(401).send({ message: 'No cuenta con las credenciales necesarias' });
        }
    });
};
//# sourceMappingURL=role.js.map