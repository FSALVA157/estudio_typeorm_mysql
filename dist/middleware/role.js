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
        const { userId } = res.locals.jwtPayload;
        const userRepository = typeorm_1.getRepository(Usuario_1.Usuario);
        let user;
        try {
            user = yield userRepository.findOneOrFail(userId);
        }
        catch (error) {
            return res.status(401).send({ message: 'No cuenta con las credenciales necesarias' });
        }
        //check
        const { role } = user;
        if (roleData === role) {
            next();
        }
        else {
            res.status(401).send({ message: 'No cuenta con las credenciales necesarias' });
        }
    });
};
//# sourceMappingURL=role.js.map