"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var express = require("express");
var bodyParser = require("body-parser");
var routes_1 = require("./routes/routes");
var path = require("path");
var opciones;
// read connection options from ormconfig file (or ENV variables)
//const connectionOptions = async () => await getConnectionOptions();
// const connectionOptions = getConnectionOptions().then;
//var connectionOptions:ConnectionOptions = null;
// const  puerto : number = process.env.PORT || 3000;
// do something with connectionOptions,
// for example append a custom naming strategy or a custom logger
// Object.assign(connectionOptions, {port: puerto});
// create a connection using modified connection options
//const connection = await createConnection(connectionOptions);
var connectionOptions = function () { return __awaiter(void 0, void 0, void 0, function () {
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
typeorm_1.createConnection(opciones).then(function (connection) { return __awaiter(void 0, void 0, void 0, function () {
    var app, puerto_activo;
    return __generator(this, function (_a) {
        app = express();
        //middlewares
        //alternativo podria haber usado la linea: app.use(express.json())
        app.use(bodyParser.json());
        // register express routes from defined application routes
        routes_1.Routes.forEach(function (route) {
            app[route.method](route.route, function (req, res, next) {
                var result = (new route.controller)[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then(function (result) { return result !== null && result !== undefined ? res.send(result) : undefined; });
                }
                else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
        });
        // setup express app here
        // process.env.PORT = '3005';
        // console.log('el puerto global es ',process.env.PORT);
        app.set('port', process.env.PORT || 3000);
        puerto_activo = app.get('port');
        app.listen(puerto_activo);
        // insert new users for test
        // await connection.manager.save(connection.manager.create(Usuario, {
        //     dni_usuario : 21633633,
        //     nombre : "xxavier",
        //     apellido : "argentino",
        //     tipo_id : 1,
        //     domicilio_procesal : 'domicilio 1',
        //     matricula : 'm2121',
        //     usuario : 'xxav',
        //     password : 'xx123456',
        //     estudio_id : 1,
        //     email : 'xxav@hotmail.com',
        //     nivel_usuario_id : 1,
        //     fecha_alta : new Date('30/08/2020')
        // }));
        // await connection.manager.save(connection.manager.create(Usuario, {
        //     dni_usuario : 212121,
        //     nombre : "Carlos",
        //     apellido : "Gardel",
        //     tipo_id : 2,
        //     domicilio_procesal : 'domicilio 3',
        //     matricula : 'm8888',
        //     usuario : 'gardel',
        //     password : 'gar123456',
        //     estudio_id : 1,
        //     email : 'gardel@hotmail.com',
        //     nivel_usuario_id : 2,
        //     fecha_alta : new Date('30/08/2020')
        // }));
        console.log("Express iniciado en puerto " + puerto_activo + ". Open http://localhost:" + puerto_activo + "/usuarios para ver los resultados");
        return [2 /*return*/];
    });
}); }).catch(function (error) { return console.log(error); });
//# sourceMappingURL=index.js.map