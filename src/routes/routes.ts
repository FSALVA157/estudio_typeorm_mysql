import {ClienteController} from "../controller/ClienteController";
import {UsuarioController} from "../controller/UsuarioController";
import { CasoController } from '../controller/CasoController';

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
},
{
    method: "get",
    route: "/casos",
    controller: CasoController,
    action: "all",
    entity: "Caso"
}, {
    method: "get",
    route: "/casos/:id",
    controller: CasoController,
    action: "one",
    entity: "Caso"
}, {
    method: "post",
    route: "/casos",
    controller: CasoController,
    action: "save",
    entity: "Caso"
}, {
    method: "delete",
    route: "/casos/:id",
    controller: CasoController,
    action: "remove",
    entity: "Caso"
},{
    method: "put",
    route: "/casos/:id",
    controller: CasoController,
    action: "update",
    entity: "Caso"
}
];