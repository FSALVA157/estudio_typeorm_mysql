"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error400_1 = require("../errors/Error400");
exports.middleware = (err, req, res, next) => {
    console.log('INGRESANDO A MIDDLEWARE');
    if (err instanceof Array) {
        res.status(400).json(err);
    }
    else if (err.status === 404) {
        //res.status(404).json('ERROR PERSONALIZADO DE RESPUESTA VACIA');
        res.status(err.status).json(err);
    }
    else if (err.name === 'QueryFailedError') {
        let error400 = new Error400_1.Error400(err);
        res.status(error400.status).json(
        //error400
        {
            name: error400.name,
            status: error400.status,
            message: error400.message
        });
    }
    else if (err instanceof Error400_1.Error400) {
        res.status(err.status).json(
        //error400
        {
            name: err.name,
            status: err.status,
            message: err.message
        });
    }
    else {
        res.status(500).json({
            status: 'Error',
            message: 'Error capturado en el middleware: ' + err
        });
        // res.status(500).json({
        //     status:'Error',
        //     message:'Error capturado en el middleware: ' + err.message
        // });
    }
};
//# sourceMappingURL=errors.js.map