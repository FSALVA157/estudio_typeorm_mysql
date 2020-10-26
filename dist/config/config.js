"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    //SEED de Autenticaciòn
    jwtSecret: process.env.SEED || 'este-es-el-seed-de-desarollo',
    //Vencimiento del Token
    //un dia seria: 60 * 60 *24
    caducidadToken: 60 * 60
};
//# sourceMappingURL=config.js.map