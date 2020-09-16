"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Error404 = /** @class */ (function (_super) {
    __extends(Error404, _super);
    function Error404() {
        var _this = _super.call(this) || this;
        _this.name = 'Error 404';
        _this.status = 404;
        _this.message = 'El recurso solicitado no Existe';
        return _this;
    }
    ;
    Error404.prototype.toJson = function () {
        return {
            name: this.name,
            status: this.status,
            message: this.message,
        };
    };
    ;
    return Error404;
}(Error));
exports.Error404 = Error404;
//# sourceMappingURL=Error404.js.map