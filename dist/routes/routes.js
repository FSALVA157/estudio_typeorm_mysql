"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClienteController_1 = require("../controller/ClienteController");
const UsuarioController_1 = require("../controller/UsuarioController");
const CasoController_1 = require("../controller/CasoController");
const CaracterLetradoController_1 = require("../controller/CaracterLetradoController");
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
    },
    {
        method: "get",
        route: "/casos",
        controller: CasoController_1.CasoController,
        action: "all",
        entity: "Caso"
    }, {
        method: "get",
        route: "/casos/:id",
        controller: CasoController_1.CasoController,
        action: "one",
        entity: "Caso"
    }, {
        method: "post",
        route: "/casos",
        controller: CasoController_1.CasoController,
        action: "save",
        entity: "Caso"
    }, {
        method: "delete",
        route: "/casos/:id",
        controller: CasoController_1.CasoController,
        action: "remove",
        entity: "Caso"
    }, {
        method: "put",
        route: "/casos/:id",
        controller: CasoController_1.CasoController,
        action: "update",
        entity: "Caso"
    },
    {
        method: "get",
        route: "/caracter_let",
        controller: CaracterLetradoController_1.CaracterLetradoController,
        action: "all",
        entity: "CaracterLetrado"
    }, {
        method: "get",
        route: "/caracter_let/:id",
        controller: CaracterLetradoController_1.CaracterLetradoController,
        action: "one",
        entity: "CaracterLetrado"
    }, {
        method: "post",
        route: "/caracter_let",
        controller: CaracterLetradoController_1.CaracterLetradoController,
        action: "save",
        entity: "CaracterLetrado"
    }, {
        method: "delete",
        route: "/caracter_let/:id",
        controller: CaracterLetradoController_1.CaracterLetradoController,
        action: "remove",
        entity: "CaracterLetrado"
    }, {
        method: "put",
        route: "/caracter_let/:id",
        controller: CaracterLetradoController_1.CaracterLetradoController,
        action: "update",
        entity: "CaracterLetrado"
    }
];
//# sourceMappingURL=routes.js.map