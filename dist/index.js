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
require("reflect-metadata");
require("es6-shim");
const typeorm_1 = require("typeorm");
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes/routes");
const path = require("path");
const errors_1 = require("./middleware/errors");
const class_validator_1 = require("class-validator");
const Usuario_1 = require("./entity/Usuario");
const Cliente_1 = require("./entity/Cliente");
const Error400_1 = require("./errors/Error400");
const Caso_1 = require("./entity/Caso");
const CasoExtrajudicial_1 = require("./entity/CasoExtrajudicial");
const ObjetoExtrajudicial_1 = require("./entity/ObjetoExtrajudicial");
const TipoProceso_1 = require("./entity/TipoProceso");
const Objeto_1 = require("./entity/Objeto");
const Juzgado_1 = require("./entity/Juzgado");
const Instancia_1 = require("./entity/Instancia");
const Fuero_1 = require("./entity/Fuero");
const EstadoCaso_1 = require("./entity/EstadoCaso");
const Distrito_1 = require("./entity/Distrito");
const CaracterLetrado_1 = require("./entity/CaracterLetrado");
const CategoriaCliente_1 = require("./entity/CategoriaCliente");
const MovimientoCaso_1 = require("./entity/MovimientoCaso");
const TipoMovimiento_1 = require("./entity/TipoMovimiento");
const Alerta_1 = require("./entity/Alerta");
const auth_1 = require("./routes/auth");
const AlertaExtra_1 = require("./entity/AlertaExtra");
const jwt_1 = require("./middleware/jwt");
const consulta_1 = require("./entity/consulta");
const RegistroContable_1 = require("./entity/RegistroContable");
const balanceCaso_1 = require("./routes/balanceCaso");
const calculos_1 = require("./routes/calculos");
const cors = require("cors");
const role_1 = require("./middleware/role");
const TipoUsuario_1 = require("./entity/TipoUsuario");
process.on('unhandledRejection', (error) => {
    console.log(error);
    throw error;
});
process.on('uncaughtException', (error) => {
    console.log(error);
    throw error;
});
var opciones;
const connectionOptions = () => __awaiter(this, void 0, void 0, function* () {
    const response = yield typeorm_1.getConnectionOptions();
    return response;
});
const cop = connectionOptions().then(options => {
    //     console.warn('valor del __dirname',__dirname);
    const entities_dir = path.resolve(__dirname, 'entity/**/*{.ts,.js}');
    const subscribers_dir = path.resolve(__dirname, 'subscriber/**/*{.ts,.js}');
    //     console.warn('LAS ENTITIES ESTAN EN ',entities_dir);
    opciones = options;
    //    console.log('mensaje antes',opciones.entities);
    //Object.assign(opciones, { entities: ["src/entity/**/*{.js,.ts}"] }); 
    Object.assign(opciones, {
        entities: [`${entities_dir}`],
        subscribers: [`${subscribers_dir}`]
    });
    //  console.log('mensaje despues',opciones.entities);
});
typeorm_1.createConnection(opciones).then((connection) => __awaiter(this, void 0, void 0, function* () {
    // create express app
    const app = express();
    //middlewares
    //alternativo podria haber usado la linea: app.use(express.json())
    app.use(bodyParser.json());
    //middlwwares de errores
    app.set('port', process.env.PORT || 3000);
    // middleware de cabeceras y cors
    app.use(cors());
    // app.use((req, res, next) => {
    //     res.header('Access-Control-Allow-Origin', '*');
    //     res.header('Access-Control-Allow-Credentials:true');
    //     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    //     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    //     res.header('Content-Type: text/html; charset=utf-8');
    //     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    //     next();
    // });
    // start express server
    const puerto_activo = app.get('port');
    app.listen(puerto_activo);
    app.use('/auth', auth_1.default);
    app.use('/balance', balanceCaso_1.default);
    app.use('/calculos', calculos_1.default);
    //validando rutas de usuarios
    app.get('/usuarios', [jwt_1.checkJwt, role_1.checkRole('admin')]);
    // app.get('/',(req,res) => {
    //         res.sendFile(path.join(__dirname,'views/index.html'));
    // });
    // register express routes from defined application routes
    routes_1.Routes.forEach(route => {
        app[route.method](route.route, (req, res, next) => {
            //funcion que efectua la consulta deseada
            function getDatos() {
                var result = (new route.controller)[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then(result => {
                        if (result !== null && result !== undefined) {
                            //   res.send(result);
                            res.status(200).json(result);
                        }
                        else {
                            // res.status(500).json({message:'No Existe el Registro solicitado'});
                            throw new Error400_1.Error400();
                        }
                    }).catch(err => {
                        console.log("ERROR DISPARADO: ", err);
                        // next(err);
                        next(err);
                    });
                }
                else if (result !== null && result !== undefined) {
                    res.status(200).json(result);
                }
                else {
                    throw new Error400_1.Error400();
                }
            }
            try {
                if (route.method === 'post') {
                    //console.log('EL MODELO UTILIZADO ES ',route.entity);
                    const errorSobreescritura = new Error400_1.Error400({
                        code: 'PELIGRO_SOBREESCRITURA',
                        name: 'Error en el Cuerpo del Request',
                        status: 412,
                        message: 'En POST esta prohibido incluir el id_automatico',
                    });
                    try {
                        let data;
                        switch (route.entity) {
                            case 'TipoUsuario':
                                data = new TipoUsuario_1.TipoUsuario(req);
                                //console.log(req);
                                if (req.body.id_tipo_usuario) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'RegistroContable':
                                data = new RegistroContable_1.RegistroContable(req);
                                //console.log(req);
                                if (req.body.id_registro) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'Consulta':
                                data = new consulta_1.Consulta(req);
                                //console.log(req);
                                if (req.body.id_consulta) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'Alerta':
                                data = new Alerta_1.Alerta(req);
                                //console.log(req);
                                if (req.body.id_alerta) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'AlertaExtra':
                                data = new AlertaExtra_1.AlertaExtra(req);
                                //console.log(req);
                                if (req.body.id_alerta_extra) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'Usuario':
                                data = new Usuario_1.Usuario(req);
                                //console.log(req);
                                if (req.body.id_usuario) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'Cliente':
                                //console.log(req);
                                data = new Cliente_1.Cliente(req);
                                if (req.body.id_cliente) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'Caso':
                                //console.log(req);
                                data = new Caso_1.Caso(req);
                                if (req.body.id_caso) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'CasoExtrajudicial':
                                //console.log(req);
                                data = new CasoExtrajudicial_1.CasoExtrajudicial(req);
                                if (req.body.id_caso_ext) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'ObjetoExtrajudicial':
                                //console.log(req);
                                data = new ObjetoExtrajudicial_1.ObjetoExtrajudicial(req);
                                if (req.body.id_objeto_ext) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'TipoProceso':
                                //console.log(req);
                                data = new TipoProceso_1.TipoProceso(req);
                                if (req.body.id_tipo_proceso) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'Objeto':
                                //console.log(req);
                                data = new Objeto_1.Objeto(req);
                                if (req.body.id_objeto) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'Juzgado':
                                //console.log(req);
                                data = new Juzgado_1.Juzgado(req);
                                if (req.body.id_juzgado) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'Instancia':
                                //console.log(req);
                                data = new Instancia_1.Instancia(req);
                                if (req.body.id_instancia) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'Fuero':
                                //console.log(req);
                                data = new Fuero_1.Fuero(req);
                                if (req.body.id_fuero) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'EstadoCaso':
                                //console.log(req);
                                data = new EstadoCaso_1.EstadoCaso(req);
                                if (req.body.id_estado) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'Distrito':
                                //console.log(req);
                                data = new Distrito_1.Distrito(req);
                                if (req.body.id_distrito) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'CaracterLetrado':
                                //console.log(req);
                                data = new CaracterLetrado_1.CaracterLetrado(req);
                                if (req.body.id_caracter_let) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'CategoriaCliente':
                                //console.log(req);
                                data = new CategoriaCliente_1.CategoriaCliente(req);
                                if (req.body.id_categoria_cli) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'MovimientoCaso':
                                //console.log(req);
                                data = new MovimientoCaso_1.MovimientoCaso(req);
                                if (req.body.id_tipo_mov) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            case 'TipoMovimiento':
                                //console.log(req);
                                data = new TipoMovimiento_1.TipoMovimiento(req);
                                if (req.body.id_caso) {
                                    throw errorSobreescritura;
                                }
                                else {
                                    break;
                                }
                            default:
                                break;
                        }
                        ;
                        class_validator_1.validate(data, { validationError: { target: false } }).then(errors => {
                            if (errors.length > 0) {
                                //console.log('EXISTEN ERRORES',errors);
                                throw errors;
                            }
                            else {
                                //console.log('NO HAY ERRORES');
                                getDatos();
                            }
                        })
                            .catch(err => {
                            console.log('PASANDO POR EL CATCH DE VALIDACION');
                            next(err);
                        });
                    }
                    catch (error) {
                        console.log('PASANDO POR CATCH DE IF THEN', error);
                        throw error;
                    }
                }
                else {
                    getDatos();
                }
            }
            catch (error) {
                console.log('ERROR DISPARADO 2');
                next(error);
            }
        });
    });
    app.use(errors_1.middleware);
    // await connection.manager.save(connection.manager.create(TipoProceso,{
    //     id_tipo_proceso:1,
    //     tipo_proceso: 'ORDINARIO',
    //     etapas: [
    //         'Demanda',
    //         'Contesta Demanda',
    //         'Prueba',
    //         'Alegato',
    //         'Sentencia'
    //     ],
    //     secuencia: {
    //         etapas: [
    //             'Demanda',
    //             'Contesta Demanda',
    //             'Prueba',
    //             'Alegato',
    //             'Sentencia'
    //         ]   
    //     },
    //     campo: "var1,var2,var3"
    // }));
    // await connection.manager.save(connection.manager.create(TipoProceso,{
    //     id_tipo_proceso:2,
    //     tipo_proceso: 'SUMARIO',
    //     etapas: [
    //         'Demanda',
    //         'Contesta Demanda',
    //         'Prueba',
    //         'Alegato',
    //         'Sentencia'
    //     ],
    //     secuencia: {
    //         etapas: [
    //             'Demanda',
    //             'Contesta Demanda',
    //             'Prueba',
    //             'Alegato',
    //             'Sentencia'
    //         ]   
    //     },
    //     campo: "var1,var2,var3"
    // }));
    // await connection.manager.save(connection.manager.create(TipoProceso,{
    //     id_tipo_proceso:3,
    //     tipo_proceso: 'SUMARISIMO',
    //     etapas: [
    //         'Demanda',
    //         'Audiencia de Conciliación',
    //         'Contesta Demanda',
    //         'Prueba',
    //         'Alegato',
    //         'Sentencia'
    //     ],
    //     secuencia: {
    //         etapas: [
    //             'Demanda',
    //             'Audiencia de Conciliación',
    //             'Contesta Demanda',
    //             'Prueba',
    //             'Alegato',
    //             'Sentencia'
    //         ]   
    //     },
    //     campo: "var1,var2,var3"
    // }));
    // await connection.manager.save(connection.manager.create(TipoProceso,{
    //     id_tipo_proceso:4,
    //     tipo_proceso: 'VOLUNTARIO',
    //     etapas: [
    //         'Demanda',
    //         'Prueba',
    //         'Sentencia'
    //     ],
    //     secuencia: {
    //         etapas: [
    //             'Demanda',
    //             'Prueba',
    //             'Sentencia'
    //         ]   
    //     },
    //     campo: "var1,var2,var3"
    // }));
    // await connection.manager.save(connection.manager.create(TipoProceso,{
    //     id_tipo_proceso:5,
    //     tipo_proceso: 'EJECUTIVO',
    //     etapas: [
    //         'Demanda',
    //         'Imtimación de Pago',
    //         'Mandamiento de Embargo',
    //        'Opone Excepciones - Prueba',
    //         'Alegato',
    //         'Sentencia',
    //         'Sentencia de Remate',
    //         'Liquidación de Capital e Intereses',
    //         'Pago',
    //         'Preparación Vía Ejecutiva',
    //         'Citación del Demandado',
    //         'Sentencia Interlocutoria'
    //     ],
    //     secuencia: {
    //         etapas: [
    //             'Demanda',
    //             'Imtimación de Pago',
    //             'Mandamiento de Embargo',
    //             'Opone Excepciones - Prueba',
    //             'Alegato',
    //             'Sentencia',
    //             'Sentencia de Remate',
    //             'Liquidación de Capital e Intereses',
    //             'Pago',
    //             'Preparación Vía Ejecutiva',
    //             'Citación del Demandado',
    //             'Sentencia Interlocutoria'
    //         ]   
    //     },
    //     campo: "var1,var2,var3"
    // }));
    // await connection.manager.save(connection.manager.create(TipoProceso,{
    //     id_tipo_proceso:6,
    //     tipo_proceso: 'UNIVERSAL',
    //     etapas: [
    //         'Inicio Juicio Sucesorio',
    //         'Apertura de Sucesión',
    //         'Edictos',
    //         'Declaratoria de Herederos',
    //         'Inventario',
    //         'Partición y Adjudicación',
    //         'Hijuelas'
    //     ],
    //     secuencia: {
    //         etapas: [
    //             'Inicio Juicio Sucesorio',
    //             'Apertura de Sucesión',
    //             'Edictos',
    //             'Declaratoria de Herederos',
    //             'Inventario',
    //             'Partición y Adjudicación',
    //             'Hijuelas'
    //         ]   
    //     },
    //     campo: "var1,var2,var3"
    // }));
    // await connection.manager.save(connection.manager.create(TipoProceso,{
    //     id_tipo_proceso:7,
    //     tipo_proceso: 'INCIDENTE',
    //     etapas: [
    //         'Incidente',
    //         'Contestación de Incidente',
    //         'Prueba',
    //         'Sentencia Interlocutoria'
    //     ],
    //     secuencia: {
    //         etapas: [
    //             'Incidente',
    //             'Contestación de Incidente',
    //             'Prueba',
    //             'Sentencia Interlocutoria'
    //         ]   
    //     },
    //     campo: "var1,var2,var3"
    // }));
    // await connection.manager.save(connection.manager.create(TipoProceso,{
    //     id_tipo_proceso:8,
    //     tipo_proceso: 'ESPECIAL LEY 7.403',
    //     etapas: [
    //         'Denuncia por Violencia',
    //         'Medidas Previas',
    //         'Audiencia',
    //         'Resolución'
    //     ],
    //     secuencia: {
    //         etapas: [
    //             'Denuncia por Violencia',
    //             'Medidas Previas',
    //             'Audiencia',
    //             'Resolución'
    //         ]   
    //     },
    //     campo: "var1,var2,var3"
    // }));
    // await connection.manager.save(connection.manager.create(TipoProceso,{
    //     id_tipo_proceso:9,
    //     tipo_proceso: 'MEDIDAS CAUTELARES',
    //     etapas: [
    //         'Inicia Medida Cautelar',
    //         'Sentencia Interlocutoria'
    //     ],
    //     secuencia: {
    //         etapas: [
    //             'Inicia Medida Cautelar',
    //             'Sentencia Interlocutoria'
    //         ]   
    //     },
    //     campo: "var1,var2,var3"
    // }));
    console.log(`Express iniciado en puerto ${puerto_activo}. Open http://localhost:${puerto_activo}/usuarios para ver los resultados`);
})).catch(error => console.log(error));
//# sourceMappingURL=index.js.map