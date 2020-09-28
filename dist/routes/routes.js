"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClienteController_1 = require("../controller/ClienteController");
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
    },
    {
        method: "get",
        route: "/clientes",
        controller: ClienteController_1.ClienteController,
        action: "all",
        entity: "Cliente"
    }, {
        method: "get",
        route: "/clientes/:id",
        controller: ClienteController_1.ClienteController,
        action: "one",
        entity: "Cliente"
    }, {
        method: "post",
        route: "/clientes",
        controller: ClienteController_1.ClienteController,
        action: "save",
        entity: "Cliente"
    }, {
        method: "delete",
        route: "/clientes/:id",
        controller: ClienteController_1.ClienteController,
        action: "remove",
        entity: "Cliente"
    }, {
        method: "put",
        route: "/clientes/:id",
        controller: ClienteController_1.ClienteController,
        action: "update",
        entity: "Cliente"
    }
];
//# sourceMappingURL=routes.js.map