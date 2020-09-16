"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = function (err, req, res, next) {
    console.log('INGRESANDO A MIDDLEWARE');
    if (err instanceof Array) {
        res.status(400).json(err);
    }
    else if (err.status === 404) {
        //res.status(404).json('ERROR PERSONALIZADO DE RESPUESTA VACIA');
        res.status(err.status).json(err);
    }
    else {
        res.status(500).json({
            status: 'Error',
            message: 'Error capturado en el middleware: ' + err.message
        });
    }
};
//# sourceMappingURL=errors.js.map