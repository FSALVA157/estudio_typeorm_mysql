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
const Documento_1 = require("../entity/Documento");
const fs = require("fs-extra");
const path = require("path");
class DocumentoController {
    constructor() {
        this.DocumentoRepository = typeorm_1.getRepository(Documento_1.Documento);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let offset = Number(request.query.offset) || 0;
            let limit = Number(request.query.limit) || 10;
            let fields = null;
            if (request.query.fields) {
                let reqFields = request.query.fields;
                fields = reqFields.toString().split(",");
                if (!fields.includes('id_documento')) {
                    fields.push('id_documento');
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
                        case 'id_documento':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'caso_id':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'fecha':
                            cond[nombreCampo] = ExpresionAvanzadaFechas(arreglo[campo]);
                            break;
                        case 'titulo':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'detalle':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'url':
                            cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                            break;
                        case 'folio':
                            cond[nombreCampo] = Number(arreglo[campo]);
                            break;
                        case 'usuario_id':
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
                    relations: ["caso"],
                    order: {
                        id_documento: "DESC"
                    },
                    select: fields,
                    skip: offset,
                    take: limit,
                    where: cond
                };
            }
            else {
                reglas = {
                    relations: ["caso"],
                    order: {
                        id_documento: "DESC"
                    },
                    skip: offset,
                    take: limit,
                    where: cond
                };
            }
            //    return await this.DocumentoRepository.find(reglas);     
            return yield this.DocumentoRepository.findAndCount(reglas);
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.DocumentoRepository.findOne(request.params.id);
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //en este controller en especial debo armar una instancia de documento antes del save
            let data = new Documento_1.Documento(request);
            return yield this.DocumentoRepository.save(data);
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let documentToRemove = yield this.DocumentoRepository.findOne(request.params.id);
            if (documentToRemove) {
                fs.unlink(path.resolve(documentToRemove.url)).then().catch(error => {
                    console.log('No existe el archivo referenciado no se ha eliminado ningun pdf! pero si el registro de tabla');
                });
            }
            return yield this.DocumentoRepository.remove(documentToRemove);
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //en este caso en específico no permitire la actualización de la url del archivo pues en ese caso es mejor hacer un delete y carga nueva
            //entonces en caso de recibir el campo url voy a lanzar un error
            if (request.body.url) {
                response.json({
                    message: "NO esta permitido actualizar la url del archivo almacenado, se recomienda eliminar y cargar nuevamente"
                });
            }
            else {
                return yield this.DocumentoRepository.update(request.params.id, request.body);
            }
        });
    }
}
exports.DocumentoController = DocumentoController;
//# sourceMappingURL=DocumentoController.js.map