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
const AlertaExtra_1 = require("../entity/AlertaExtra");
class AlertaExtraController {
    constructor() {
        this.AlertaExtraRepository = typeorm_1.getRepository(AlertaExtra_1.AlertaExtra);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let offset = Number(request.query.offset) || 0;
            let limit = Number(request.query.limit) || 10;
            let fields = null;
            if (request.query.fields) {
                let reqFields = request.query.fields;
                fields = reqFields.toString().split(",");
                if (!fields.includes('id_alerta_extra')) {
                    fields.push('id_alerta_extra');
                }
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
                    //console.log(`${campo} = ${arreglo[campo]}`);
                    //const element = arreglo[campo];
                    let nombreCampo = campo.toString();
                    switch (nombreCampo) {
                        case 'fecha':
                            cond[nombreCampo] = ExpresionAvanzadaFechas(arreglo[campo]);
                            break;
                        case 'detalle':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'estado':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'caso_extra_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'visible':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        default:
                            break;
                    }
                }
            }
            let reglas;
            if (fields != null) {
                reglas = {
                    order: {
                        fecha: "DESC"
                    },
                    select: fields,
                    skip: offset,
                    take: limit,
                    where: cond
                };
            }
            else {
                reglas = {
                    order: {
                        fecha: "DESC"
                    },
                    skip: offset,
                    take: limit,
                    where: cond
                };
            }
            //  return await this.AlertaExtraRepository.find(reglas);     
            return yield this.AlertaExtraRepository.findAndCount(reglas);
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AlertaExtraRepository.findOne(request.params.id);
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AlertaExtraRepository.save(request.body);
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let alertaToRemove = yield this.AlertaExtraRepository.findOne(request.params.id);
            return yield this.AlertaExtraRepository.remove(alertaToRemove);
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.AlertaExtraRepository.update(request.params.id, request.body);
        });
    }
}
exports.AlertaExtraController = AlertaExtraController;
//# sourceMappingURL=AlertaExtraController.js.map