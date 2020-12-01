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
const CasoExtrajudicial_1 = require("../entity/CasoExtrajudicial");
class CasoExtraController {
    constructor() {
        this.casoExtraRepository = typeorm_1.getRepository(CasoExtrajudicial_1.CasoExtrajudicial);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let offset = Number(request.query.offset) || 0;
            let limit = Number(request.query.limit) || 10;
            let fields = null;
            // let fields:any =  ["id_cliente","dni_cuit","categoria_id","razon_social","nombre","apellido","domicilio_real","domicilio_alternativo","provincia","departamento","localidad","telefono_celular","telefono_alternativo","ocupacion","email","fecha_alta"];
            if (request.query.fields) {
                let reqFields = request.query.fields;
                fields = reqFields.toString().split(",");
                if (!fields.includes('id_caso_ext')) {
                    fields.push('id_caso_ext');
                }
                // if(!fields.includes('apellido')){
                //     fields.push('apellido')
                // }
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
                        case 'id_caso_ext':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'cliente_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'fecha_tramite':
                            cond[nombreCampo] = ExpresionAvanzadaFechas(arreglo[campo]);
                            break;
                        case 'detalle':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'expediente_nro':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'contraparte_nombre':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'contraparte_apellido':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'contraparte_razon_social':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'contraparte_dni':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'contraparte_domicilio':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'contraparte_telefono':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'materia_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'objeto_ext_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'mediador':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'mediacion_domicilio':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'mediador_telef':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'fecha_audiencia':
                            cond[nombreCampo] = ExpresionAvanzadaFechas(arreglo[campo]);
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
                    relations: ["asientos"],
                    order: {
                        id_caso_ext: "ASC"
                    },
                    select: fields,
                    skip: offset,
                    take: limit,
                    where: cond
                };
            }
            else {
                reglas = {
                    relations: ["asientos"],
                    order: {
                        id_caso_ext: "ASC"
                    },
                    skip: offset,
                    take: limit,
                    where: cond
                };
            }
            return yield this.casoExtraRepository.find(reglas);
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.casoExtraRepository.findOne(request.params.id);
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.casoExtraRepository.save(request.body);
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let userToRemove = yield this.casoExtraRepository.findOne(request.params.id);
            return yield this.casoExtraRepository.remove(userToRemove);
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //const nuevoUsuario = this.userRepository.create();
            return yield this.casoExtraRepository.update(request.params.id, request.body);
        });
    }
}
exports.CasoExtraController = CasoExtraController;
//# sourceMappingURL=CasoExtraController.js.map