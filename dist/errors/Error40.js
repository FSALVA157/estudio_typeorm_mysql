"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Error404 extends Error {
    constructor() {
        super();
        this.name = 'Error 404';
        this.status = 404;
        this.message = 'El recurso solicitado no Existe';
    }
    ;
    toJson() {
        return {
            name: this.name,
            status: this.status,
            message: this.message,
        };
    }
    ;
}
exports.Error404 = Error404;
//# sourceMappingURL=Error40.js.map