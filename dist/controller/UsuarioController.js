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
class UsuarioController {
    constructor() {
        this.userRepository = typeorm_1.getRepository(Usuario_1.Usuario);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let offset = Number(request.query.offset) || 0;
            let limit = Number(request.query.limit) || 10;
            let fields = ["id_usuario", "dni_usuario", "nombre", "apellido", "tipo_id", "domicilio_procesal", "matricula", "usuario", "estudio_id", "email", "nivel_usuario_id", "estado", "fecha_alta", "fecha_baja"];
            if (request.query.fields) {
                let reqFields = request.query.fields;
                fields = reqFields.toString().split(",");
            }
            ;
            //funcion que devuelve la expresion de las consultas de parametros strings con funciones avanzadas de filtros (LIKE,NOT,IN)
            function ExpresionAvanzada(campo) {
                if (campo.toUpperCase() == 'NULL') {
                    return typeorm_1.IsNull();
                }
                else if (campo.toUpperCase() == 'NOT NULL') {
                    return typeorm_1.Not(typeorm_1.IsNull());
                }
                if (campo.toUpperCase().startsWith('NOT ')) {
                    campo = campo.slice(4);
                    if (campo.toUpperCase().startsWith('LIKE ')) {
                        campo = campo.slice(5);
                        return typeorm_1.Not(typeorm_1.Like('%' + campo + '%'));
                    }
                    else {
                        //campo = campo.slice(4);
                        return typeorm_1.Not(campo);
                    }
                }
                else {
                    if (campo.toUpperCase().startsWith('LIKE ')) {
                        campo = campo.slice(5);
                        return typeorm_1.Like('%' + campo + '%');
                    }
                    else {
                        return campo;
                    }
                }
            }
            function ExpresionAvanzadaFechas(campo) {
                if (campo.toUpperCase() == 'NULL') {
                    return typeorm_1.IsNull();
                }
                else if (campo.toUpperCase() == 'NOT NULL') {
                    return typeorm_1.Not(typeorm_1.IsNull());
                }
                return campo;
            }
            let arreglo = request.query;
            let cond = new Object();
            for (const campo in arreglo) {
                if (Object.prototype.hasOwnProperty.call(arreglo, campo)) {
                    let nombreCampo = campo.toString();
                    switch (nombreCampo) {
                        case 'id_usuario':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'dni_usuario':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'nombre':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'apellido':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'tipo_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'domicilio_procesal':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'matricula':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'usuario':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'estudio_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'email':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'nivel_usuario_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'estado':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'fecha_alta':
                            cond[nombreCampo] = ExpresionAvanzadaFechas(arreglo[campo]);
                            break;
                        case 'fecha_baja':
                            cond[nombreCampo] = ExpresionAvanzadaFechas(arreglo[campo]);
                            //cond[nombreCampo] = arreglo[campo];
                            break;
                        default:
                            break;
                    }
                }
            }
            //   console.log('EL ARREGLO NUEVO ES ESTE',cond);
            return yield this.userRepository.find({
                select: fields,
                order: {
                    apellido: "ASC"
                },
                skip: offset,
                take: limit,
                where: cond
            });
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOne(request.params.id);
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // let nuevoUsuario = new Usuario(request.body);
            let respuesta = yield this.userRepository.save(request.body);
            // eliminar el campo password para que no se exponga en la respuesta
            delete respuesta['password'];
            //console.log(respuesta);
            return respuesta;
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let userToRemove = yield this.userRepository.findOne(request.params.id);
            return yield this.userRepository.remove(userToRemove);
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //const nuevoUsuario = this.userRepository.create();
            return yield this.userRepository.update(request.params.id, request.body);
        });
    }
}
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=UsuarioController.js.map