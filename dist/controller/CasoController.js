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
const MovimientoCaso_1 = require("../entity/MovimientoCaso");
const RegistroContable_1 = require("../entity/RegistroContable");
const Alerta_1 = require("../entity/Alerta");
const Caso_1 = require("../entity/Caso");
class CasoController {
    constructor() {
        this.casoRepository = typeorm_1.getRepository(Caso_1.Caso);
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
                if (!fields.includes('id_caso')) {
                    fields.push('id_caso');
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
                        case 'id_caso':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'cliente_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'fecha_inicio':
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
                        case 'contraparte_dom_real':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'contraparte_dom_proc':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'contraparte_telefono':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'contraparte_abogado':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'jurisdiccion_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'distrito_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'fuero_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'juzgado_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'caracter_letrado_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'caracter_cliente_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'mesa':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'objeto_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'tipo_proceso_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'instancia_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'caratula':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'estado_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'etapa':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'monto_juicio':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'fecha_fin':
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
                    relations: ["movimientos", "alertas", "asientos"],
                    order: {
                        id_caso: "DESC",
                    },
                    select: fields,
                    skip: offset,
                    take: limit,
                    where: cond
                };
            }
            else {
                reglas = {
                    relations: ["movimientos", "alertas", "asientos"],
                    order: {
                        id_caso: "DESC",
                    },
                    skip: offset,
                    take: limit,
                    where: cond
                };
            }
            //return await this.casoRepository.find(reglas);     
            return this.casoRepository.findAndCount(reglas);
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.casoRepository.findOne(request.params.id, { relations: ["movimientos", "alertas", "asientos"] });
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.casoRepository.save(request.body);
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //     let userToRemove = await this.casoRepository.findOne(request.params.id);
            //    return  await this.casoRepository.remove(userToRemove);
            const movimientoRepo = typeorm_1.getRepository(MovimientoCaso_1.MovimientoCaso);
            const asientoRepo = typeorm_1.getRepository(RegistroContable_1.RegistroContable);
            const alertaRepo = typeorm_1.getRepository(Alerta_1.Alerta);
            const claveCaso = Number(request.params.id);
            yield movimientoRepo.softDelete({
                caso_id: claveCaso
            });
            yield asientoRepo.softDelete({
                caso_id: claveCaso
            });
            yield alertaRepo.softDelete({
                caso_id: claveCaso
            });
            return yield this.casoRepository.softDelete({
                id_caso: claveCaso
            });
            //     const caso: Caso=  await this.casoRepository.findOne({
            //         where: {
            //             id_caso: Number(request.params.id)
            //         },
            //         relations: ["movimientos","alertas","asientos"],
            //     });
            //     caso.movimientos.forEach(async movimiento => {
            //         await movimientoRepo.softDelete({id_mov_caso: Number(movimiento.id_mov_caso)});
            //  });
            //  caso.asientos.forEach(async asiento => {
            //     await asientoRepo.softDelete({id_registro: Number(asiento.id_registro)});
            //  });
            //  caso.alertas.forEach(async alerta => {
            //     await alertaRepo.softDelete({id_alerta: Number(alerta.id_alerta)});
            //  });
            // await casosRepo.softDelete({id_caso: Number(caso.id_caso)});
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //const nuevoUsuario = this.userRepository.create();
            return yield this.casoRepository.update(request.params.id, request.body);
        });
    }
}
exports.CasoController = CasoController;
//# sourceMappingURL=CasoController.js.map