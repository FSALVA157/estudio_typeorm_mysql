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
const TipoProceso_1 = require("../entity/TipoProceso");
class TipoProcesoController {
    constructor() {
        this.TipoProcesoRepository = typeorm_1.getRepository(TipoProceso_1.TipoProceso);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let offset = Number(request.query.offset) || 0;
            let limit = Number(request.query.limit) || 10;
            let fields = null;
            if (request.query.fields) {
                let reqFields = request.query.fields;
                fields = reqFields.toString().split(",");
                if (!fields.includes('id_tipo_proceso')) {
                    fields.push('id_tipo_proceso');
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
                        case 'tipo_proceso':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'etapas':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
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
                        id_tipo_proceso: "ASC"
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
                        id_tipo_proceso: "ASC"
                    },
                    skip: offset,
                    take: limit,
                    where: cond
                };
            }
            return yield this.TipoProcesoRepository.find(reglas);
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.TipoProcesoRepository.findOne(request.params.id);
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.TipoProcesoRepository.save(request.body);
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let userToRemove = yield this.TipoProcesoRepository.findOne(request.params.id);
            return yield this.TipoProcesoRepository.remove(userToRemove);
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.TipoProcesoRepository.update(request.params.id, request.body);
        });
    }
}
exports.TipoProcesoController = TipoProcesoController;
//# sourceMappingURL=TipoProcesoController.js.map