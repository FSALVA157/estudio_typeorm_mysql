import {UsuarioController} from "../controller/UsuarioController";


export const Routes = [{
    method: "get",
    route: "/usuarios",
    controller: UsuarioController,
    action: "all"
}, {
    method: "get",
    route: "/usuarios/:id",
    controller: UsuarioController,
    action: "one"
}, {
    method: "post",
    route: "/usuarios",
    controller: UsuarioController,
    action: "save"
}, {
    method: "delete",
    route: "/usuarios/:id",
    controller: UsuarioController,
    action: "remove"
},{
    method: "put",
    route: "/usuarios/:id",
    controller: UsuarioController,
    action: "update"
}
];