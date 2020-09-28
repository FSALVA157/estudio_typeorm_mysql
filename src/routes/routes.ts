import {ClienteController} from "../controller/ClienteController";
import {UsuarioController} from "../controller/UsuarioController";

export const Routes = [{
    method: "get",
    route: "/usuarios",
    controller: UsuarioController,
    action: "all",
    entity: "Usuario"
}, {
    method: "get",
    route: "/usuarios/:id",
    controller: UsuarioController,
    action: "one",
    entity: "Usuario"
}, {
    method: "post",
    route: "/usuarios",
    controller: UsuarioController,
    action: "save",
    entity: "Usuario"
}, {
    method: "delete",
    route: "/usuarios/:id",
    controller: UsuarioController,
    action: "remove",
    entity: "Usuario"
},{
    method: "put",
    route: "/usuarios/:id",
    controller: UsuarioController,
    action: "update",
    entity: "Usuario"
},
{
    method: "get",
    route: "/clientes",
    controller: ClienteController,
    action: "all",
    entity: "Cliente"
}, {
    method: "get",
    route: "/clientes/:id",
    controller: ClienteController,
    action: "one",
    entity: "Cliente"
}, {
    method: "post",
    route: "/clientes",
    controller: ClienteController,
    action: "save",
    entity: "Cliente"
}, {
    method: "delete",
    route: "/clientes/:id",
    controller: ClienteController,
    action: "remove",
    entity: "Cliente"
},{
    method: "put",
    route: "/clientes/:id",
    controller: ClienteController,
    action: "update",
    entity: "Cliente"
}
];