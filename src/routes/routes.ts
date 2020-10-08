import {ClienteController} from "../controller/ClienteController";
import {UsuarioController} from "../controller/UsuarioController";
import { CasoController } from '../controller/CasoController';
import { CaracterLetradoController } from '../controller/CaracterLetradoController';
import { DistritoController } from '../controller/DistritoController';
import { EstadoCasoController } from '../controller/EstadoCasoController';
import { FueroController } from '../controller/FueroController';
import { InstanciaController } from '../controller/InstanciaController';
import { JuzgadoController } from '../controller/JuzgadoController';

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
},
{
    method: "get",
    route: "/caracter_let",
    controller: CaracterLetradoController,
    action: "all",
    entity: "CaracterLetrado"
}, {
    method: "get",
    route: "/caracter_let/:id",
    controller: CaracterLetradoController,
    action: "one",
    entity: "CaracterLetrado"
}, {
    method: "post",
    route: "/caracter_let",
    controller: CaracterLetradoController,
    action: "save",
    entity: "CaracterLetrado"
}, {
    method: "delete",
    route: "/caracter_let/:id",
    controller: CaracterLetradoController,
    action: "remove",
    entity: "CaracterLetrado"
},{
    method: "put",
    route: "/caracter_let/:id",
    controller: CaracterLetradoController,
    action: "update",
    entity: "CaracterLetrado"
},{
    method: "get",
    route: "/distrito",
    controller: DistritoController,
    action: "all",
    entity: "Distrito"
}, {
    method: "get",
    route: "/distrito/:id",
    controller: DistritoController,
    action: "one",
    entity: "Distrito"
}, {
    method: "post",
    route: "/distrito",
    controller: DistritoController,
    action: "save",
    entity: "Distrito"
}, {
    method: "delete",
    route: "/distrito/:id",
    controller: DistritoController,
    action: "remove",
    entity: "Distrito"
},{
    method: "put",
    route: "/distrito/:id",
    controller: DistritoController,
    action: "update",
    entity: "Distrito"
},{
    method: "get",
    route: "/estados",
    controller: EstadoCasoController,
    action: "all",
    entity: "EstadoCaso"
}, {
    method: "get",
    route: "/estados/:id",
    controller: EstadoCasoController,
    action: "one",
    entity: "EstadoCaso"
}, {
    method: "post",
    route: "/estados",
    controller: EstadoCasoController,
    action: "save",
    entity: "EstadoCaso"
}, {
    method: "delete",
    route: "/estados/:id",
    controller: EstadoCasoController,
    action: "remove",
    entity: "EstadoCaso"
},{
    method: "put",
    route: "/estados/:id",
    controller: EstadoCasoController,
    action: "update",
    entity: "EstadoCaso"
},{
    method: "get",
    route: "/fueros",
    controller: FueroController,
    action: "all",
    entity: "Fuero"
}, {
    method: "get",
    route: "/fueros/:id",
    controller: FueroController,
    action: "one",
    entity: "Fuero"
}, {
    method: "post",
    route: "/fueros",
    controller: FueroController,
    action: "save",
    entity: "Fuero"
}, {
    method: "delete",
    route: "/fueros/:id",
    controller: FueroController,
    action: "remove",
    entity: "Fuero"
},{
    method: "put",
    route: "/fueros/:id",
    controller: FueroController,
    action: "update",
    entity: "Fuero"
},{
    method: "get",
    route: "/instancias",
    controller: InstanciaController,
    action: "all",
    entity: "Instancia"
}, {
    method: "get",
    route: "/instancias/:id",
    controller: InstanciaController,
    action: "one",
    entity: "Instancia"
}, {
    method: "post",
    route: "/instancias",
    controller: InstanciaController,
    action: "save",
    entity: "Instancia"
}, {
    method: "delete",
    route: "/instancias/:id",
    controller: InstanciaController,
    action: "remove",
    entity: "Instancia"
},{
    method: "put",
    route: "/instancias/:id",
    controller: InstanciaController,
    action: "update",
    entity: "Instancia"
},{
    method: "get",
    route: "/juzgados",
    controller: JuzgadoController,
    action: "all",
    entity: "Juzgado"
}, {
    method: "get",
    route: "/juzgados/:id",
    controller: JuzgadoController,
    action: "one",
    entity: "Juzgado"
}, {
    method: "post",
    route: "/juzgados",
    controller: JuzgadoController,
    action: "save",
    entity: "Juzgado"
}, {
    method: "delete",
    route: "/juzgados/:id",
    controller: JuzgadoController,
    action: "remove",
    entity: "Juzgado"
},{
    method: "put",
    route: "/juzgados/:id",
    controller: JuzgadoController,
    action: "update",
    entity: "Juzgado"
}
];