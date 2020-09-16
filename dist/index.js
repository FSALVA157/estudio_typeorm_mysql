"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var express = require("express");
var bodyParser = require("body-parser");
var routes_1 = require("./routes/routes");
var path = require("path");
var errors_1 = require("./middleware/errors");
var class_validator_1 = require("class-validator");
var Usuario_1 = require("./entity/Usuario");
var Error404_1 = require("./errors/Error404");
process.on('unhandledRejection', function (error) {
    console.log(error);
    throw error;
});
process.on('uncaughtException', function (error) {
    console.log(error);
    throw error;
});
var opciones;
var connectionOptions = function () { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getConnectionOptions()];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
var cop = connectionOptions().then(function (options) {
    console.warn('valor del __dirname', __dirname);
    var entities_dir = path.resolve(__dirname, 'entity/**/*{.ts,.js}');
    console.warn('LAS ENTITIES ESTAN EN ', entities_dir);
    opciones = options;
    console.log('mensaje antes', opciones.entities);
    //Object.assign(opciones, { entities: ["src/entity/**/*{.js,.ts}"] }); 
    Object.assign(opciones, { entities: ["" + entities_dir] });
    console.log('mensaje despues', opciones.entities);
});
typeorm_1.createConnection(opciones).then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
    var app, puerto_activo;
    return __generator(this, function (_a) {
        app = express();
        //middlewares
        //alternativo podria haber usado la linea: app.use(express.json())
        app.use(bodyParser.json());
        //middlwwares de errores
        app.set('port', process.env.PORT || 3000);
        puerto_activo = app.get('port');
        app.listen(puerto_activo);
        // register express routes from defined application routes
        routes_1.Routes.forEach(function (route) {
            app[route.method](route.route, function (req, res, next) {
                //funcion que efectua la consulta deseada
                function getDatos() {
                    var result = (new route.controller)[route.action](req, res, next);
                    if (result instanceof Promise) {
                        result.then(function (result) {
                            if (result !== null && result !== undefined) {
                                res.send(result);
                            }
                            else {
                                // res.status(500).json({message:'No Existe el Registro solicitado'});
                                throw new Error404_1.Error404();
                            }
                        }).catch(function (err) {
                            console.log("ERROR DISPARADO: ");
                            // next(err);
                            next(err);
                        });
                    }
                    else if (result !== null && result !== undefined) {
                        res.json(result);
                    }
                    else {
                        throw new Error404_1.Error404();
                    }
                }
                try {
                    if (route.method === 'post') {
                        console.log('EL MODELO UTILIZADO ES ', route.entity);
                        try {
                            var data = void 0;
                            switch (route.entity) {
                                case 'Usuario':
                                    data = new Usuario_1.Usuario(req);
                                    break;
                                default:
                                    break;
                            }
                            class_validator_1.validate(data, { validationError: { target: false } }).then(function (errors) {
                                if (errors.length > 0) {
                                    console.log('EXISTEN ERRORES', errors);
                                    throw errors;
                                }
                                else {
                                    console.log('NO HAY ERRORES');
                                    getDatos();
                                }
                            })
                                .catch(function (err) {
                                console.log('PASANDO POR EL CATCH DE VALIDACION');
                                next(err);
                            });
                        }
                        catch (error) {
                            console.log('PASANDO POR CATCH DE IF THEN');
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
        console.log("Express iniciado en puerto " + puerto_activo + ". Open http://localhost:" + puerto_activo + "/usuarios para ver los resultados");
        return [2 /*return*/];
    });
}); }).catch(function (error) { return console.log(error); });
//# sourceMappingURL=index.js.map