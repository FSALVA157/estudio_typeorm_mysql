"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UsuarioController_1 = require("../controller/UsuarioController");
exports.Routes = [{
        method: "get",
        route: "/usuarios",
        controller: UsuarioController_1.UsuarioController,
        action: "all"
    }, {
        method: "get",
        route: "/usuarios/:id",
        controller: UsuarioController_1.UsuarioController,
        action: "one"
    }, {
        method: "post",
        route: "/usuarios",
        controller: UsuarioController_1.UsuarioController,
        action: "save"
    }, {
        method: "delete",
        route: "/usuarios/:id",
        controller: UsuarioController_1.UsuarioController,
        action: "remove"
    }, {
        method: "put",
        route: "/usuarios/:id",
        controller: UsuarioController_1.UsuarioController,
        action: "update"
    }
];
//# sourceMappingURL=routes.js.map