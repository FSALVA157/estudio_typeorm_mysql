"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsuarioController_1 = require("../controller/UsuarioController");
exports.Routes = [{
        method: "get",
        route: "/usuarios",
        controller: UsuarioController_1.UsuarioController,
        action: "all",
        entity: "Usuario"
    }, {
        method: "get",
        route: "/usuarios/:id",
        controller: UsuarioController_1.UsuarioController,
        action: "one",
        entity: "Usuario"
    }, {
        method: "post",
        route: "/usuarios",
        controller: UsuarioController_1.UsuarioController,
        action: "save",
        entity: "Usuario"
    }, {
        method: "delete",
        route: "/usuarios/:id",
        controller: UsuarioController_1.UsuarioController,
        action: "remove",
        entity: "Usuario"
    }, {
        method: "put",
        route: "/usuarios/:id",
        controller: UsuarioController_1.UsuarioController,
        action: "update",
        entity: "Usuario"
    }
];
//# sourceMappingURL=routes.js.map