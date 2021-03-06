import {ClienteController} from "../controller/ClienteController";
import {UsuarioController} from "../controller/UsuarioController";
import { CasoController } from '../controller/CasoController';
import { CaracterLetradoController } from '../controller/CaracterLetradoController';
import { DistritoController } from '../controller/DistritoController';
import { EstadoCasoController } from '../controller/EstadoCasoController';
import { FueroController } from '../controller/FueroController';
import { InstanciaController } from '../controller/InstanciaController';
import { JuzgadoController } from '../controller/JuzgadoController';
import { ObjetoController } from '../controller/ObjetoController';
import { TipoProcesoController } from '../controller/TipoProcesoController';
import { ObjetoExtraController } from '../controller/ObjetoExtraController';
import { CasoExtraController } from '../controller/CasoExtraController';
import { CategoriaClienteController } from '../controller/CategoriaClienteController';
import { MovimientoCasoController } from '../controller/MovimientoCasoController';
import { TipoMovimientoController } from '../controller/TipoMovimientoController';
import { AlertaController } from "../controller/AlertaController";
import { AlertaExtraController } from '../controller/AlertaExtraController';

import { checkJwt } from '../middleware/jwt';
import { ConsultaController } from '../controller/ConsultaController';
import { RegistroContableController } from '../controller/RegistroContableController';
import { TipoUsuarioController } from '../controller/TipoUsuarioController';
import { EtapaController } from '../controller/EtapaController';
import { DocumentoController } from '../controller/DocumentoController';


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
},{
    method: "get",
    route: "/objetos",
    controller: ObjetoController,
    action: "all",
    entity: "Objeto"
}, {
    method: "get",
    route: "/objetos/:id",
    controller: ObjetoController,
    action: "one",
    entity: "Objeto"
}, {
    method: "post",
    route: "/objetos",
    controller: ObjetoController,
    action: "save",
    entity: "Objeto"
}, {
    method: "delete",
    route: "/objetos/:id",
    controller: ObjetoController,
    action: "remove",
    entity: "Objeto"
},{
    method: "put",
    route: "/objetos/:id",
    controller: ObjetoController,
    action: "update",
    entity: "Objeto"
},{
    method: "get",
    route: "/tipos",
    controller: TipoProcesoController,
    action: "all",
    entity: "TipoProceso"
}, {
    method: "get",
    route: "/tipos/:id",
    controller: TipoProcesoController,
    action: "one",
    entity: "TipoProceso"
}, {
    method: "post",
    route: "/tipos",
    controller: TipoProcesoController,
    action: "save",
    entity: "TipoProceso"
}, {
    method: "delete",
    route: "/tipos/:id",
    controller: TipoProcesoController,
    action: "remove",
    entity: "TipoProceso"
},{
    method: "put",
    route: "/tipos/:id",
    controller: TipoProcesoController,
    action: "update",
    entity: "TipoProceso"
},{
    method: "get",
    route: "/objetos_extra",
    controller: ObjetoExtraController,
    action: "all",
    entity: "ObjetoExtrajudicial"
}, {
    method: "get",
    route: "/objetos_extra/:id",
    controller: ObjetoExtraController,
    action: "one",
    entity: "ObjetoExtrajudicial"
}, {
    method: "post",
    route: "/objetos_extra",
    controller: ObjetoExtraController,
    action: "save",
    entity: "ObjetoExtrajudicial"
}, {
    method: "delete",
    route: "/objetos_extra/:id",
    controller: ObjetoExtraController,
    action: "remove",
    entity: "ObjetoExtrajudicial"
},{
    method: "put",
    route: "/objetos_extra/:id",
    controller: ObjetoExtraController,
    action: "update",
    entity: "ObjetoExtrajudicial"
},{
    method: "get",
    route: "/casos_extra",
    controller: CasoExtraController,
    action: "all",
    entity: "CasoExtrajudicial"
}, {
    method: "get",
    route: "/casos_extra/:id",
    controller: CasoExtraController,
    action: "one",
    entity: "CasoExtrajudicial"
}, {
    method: "post",
    route: "/casos_extra",
    controller: CasoExtraController,
    action: "save",
    entity: "CasoExtrajudicial"
}, {
    method: "delete",
    route: "/casos_extra/:id",
    controller: CasoExtraController,
    action: "remove",
    entity: "CasoExtrajudicial"
},{
    method: "put",
    route: "/casos_extra/:id",
    controller: CasoExtraController,
    action: "update",
    entity: "CasoExtrajudicial"
},{
    method: "get",
    route: "/categorias_cli",
    controller: CategoriaClienteController,
    action: "all",
    entity: "CategoriaCliente"
}, {
    method: "get",
    route: "/categorias_cli/:id",
    controller: CategoriaClienteController,
    action: "one",
    entity: "CategoriaCliente"
}, {
    method: "post",
    route: "/categorias_cli",
    controller: CategoriaClienteController,
    action: "save",
    entity: "CategoriaCliente"
}, {
    method: "delete",
    route: "/categorias_cli/:id",
    controller: CategoriaClienteController,
    action: "remove",
    entity: "CategoriaCliente"
},{
    method: "put",
    route: "/categorias_cli/:id",
    controller: CategoriaClienteController,
    action: "update",
    entity: "CategoriaCliente"
},{
    method: "get",
    route: "/movimientos",
    controller: MovimientoCasoController,
    action: "all",
    entity: "MovimientoCaso"
}, {
    method: "get",
    route: "/movimientos/:id",
    controller: MovimientoCasoController,
    action: "one",
    entity: "MovimientoCaso"
}, {
    method: "post",
    route: "/movimientos",
    controller: MovimientoCasoController,
    action: "save",
    entity: "MovimientoCaso"
}, {
    method: "delete",
    route: "/movimientos/:id",
    controller: MovimientoCasoController,
    action: "remove",
    entity: "MovimientoCaso"
},{
    method: "put",
    route: "/movimientos/:id",
    controller: MovimientoCasoController,
    action: "update",
    entity: "MovimientoCaso"
},{
    method: "get",
    route: "/tipos_mov",
    controller: TipoMovimientoController,
    action: "all",
    entity: "TipoMovimiento"
}, {
    method: "get",
    route: "tipos_movmovimientos/:id",
    controller:TipoMovimientoController,
    action: "one",
    entity: "TipoMovimiento"
}, {
    method: "post",
    route: "/tipos_mov",
    controller: TipoMovimientoController,
    action: "save",
    entity: "TipoMovimiento"
}, {
    method: "delete",
    route: "/tipos_mov/:id",
    controller: TipoMovimientoController,
    action: "remove",
    entity: "TipoMovimiento"
},{
    method: "put",
    route: "/tipos_mov/:id",
    controller: TipoMovimientoController,
    action: "update",
    entity: "TipoMovimiento"
},{
    method: "get",
    route: "/alertas",
    controller: AlertaController,
    action: "all",
    entity: "Alerta"
}, {
    method: "get",
    route: "/alertas/:id",
    controller:AlertaController,
    action: "one",
    entity: "Alerta"
}, {
    method: "post",
    route: "/alertas",
    controller: AlertaController,
    action: "save",
    entity: "Alerta"
}, {
    method: "delete",
    route: "/alertas/:id",
    controller: AlertaController,
    action: "remove",
    entity: "Alerta"
},{
    method: "put",
    route: "/alertas/:id",
    controller: AlertaController,
    action: "update",
    entity: "Alerta"
},{
    method: "get",
    route: "/alertas_extra",
    controller: AlertaExtraController,
    action: "all",
    entity: "AlertaExtra"
}, {
    method: "get",
    route: "/alertas_extra/:id",
    controller:AlertaExtraController,
    action: "one",
    entity: "AlertaExtra"
}, {
    method: "post",
    route: "/alertas_extra",
    controller: AlertaExtraController,
    action: "save",
    entity: "AlertaExtra"
}, {
    method: "delete",
    route: "/alertas_extra/:id",
    controller: AlertaExtraController,
    action: "remove",
    entity: "AlertaExtra"
},{
    method: "put",
    route: "/alertas_extra/:id",
    controller: AlertaExtraController,
    action: "update",
    entity: "AlertaExtra"
},{
    method: "get",
    route: "/consultas",
    controller: ConsultaController,
    action: "all",
    entity: "Consulta"
}, {
    method: "get",
    route: "/consultas/:id",
    controller:ConsultaController,
    action: "one",
    entity: "Consulta"
}, {
    method: "post",
    route: "/consultas",
    controller: ConsultaController,
    action: "save",
    entity: "Consulta"
}, {
    method: "delete",
    route: "/consultas/:id",
    controller: ConsultaController,
    action: "remove",
    entity: "Consulta"
},{
    method: "put",
    route: "/consultas/:id",
    controller: ConsultaController,
    action: "update",
    entity: "Consulta"
},{
    method: "get",
    route: "/asientos",
    controller: RegistroContableController,
    action: "all",
    entity: "RegistroContable"
}, {
    method: "get",
    route: "/asientos/:id",
    controller:RegistroContableController,
    action: "one",
    entity: "RegistroContable"
}, {
    method: "post",
    route: "/asientos",
    controller: RegistroContableController,
    action: "save",
    entity: "RegistroContable"
}, {
    method: "delete",
    route: "/asientos/:id",
    controller: RegistroContableController,
    action: "remove",
    entity: "RegistroContable"
},{
    method: "put",
    route: "/asientos/:id",
    controller: RegistroContableController,
    action: "update",
    entity: "RegistroContable"
},{
    method: "get",
    route: "/tipo_usuario",
    controller: TipoUsuarioController,
    action: "all",
    entity: "TipoUsuario"
}, {
    method: "get",
    route: "/tipo_usuario/:id",
    controller:TipoUsuarioController,
    action: "one",
    entity: "TipoUsuario"
}, {
    method: "post",
    route: "/tipo_usuario",
    controller: TipoUsuarioController,
    action: "save",
    entity: "TipoUsuario"
}, {
    method: "delete",
    route: "/tipo_usuario/:id",
    controller: TipoUsuarioController,
    action: "remove",
    entity: "TipoUsuario"
},{
    method: "put",
    route: "/tipo_usuario/:id",
    controller: TipoUsuarioController,
    action: "update",
    entity: "TipoUsuario"
},{
    method: "get",
    route: "/etapas",
    controller: EtapaController,
    action: "all",
    entity: "Etapa"
}, {
    method: "get",
    route: "/etapas/:id",
    controller:EtapaController,
    action: "one",
    entity: "Etapa"
}, {
    method: "post",
    route: "/etapas",
    controller: EtapaController,
    action: "save",
    entity: "Etapa"
}, {
    method: "delete",
    route: "/etapas/:id",
    controller: EtapaController,
    action: "remove",
    entity: "Etapa"
},{
    method: "put",
    route: "/etapas/:id",
    controller: EtapaController,
    action: "update",
    entity: "Etapa"
},{
    method: "get",
    route: "/documentos",
    controller: DocumentoController,
    action: "all",
    entity: "Documento"
}, {
    method: "get",
    route: "/documentos/:id",
    controller: DocumentoController,
    action: "one",
    entity: "Documento"
}, {
    method: "post",
    route: "/documentos",
    controller: DocumentoController,
    action: "save",
    entity: "Documento"
}, {
    method: "delete",
    route: "/documentos/:id",
    controller: DocumentoController,
    action: "remove",
    entity: "Documento"
},{
    method: "put",
    route: "/documentos/:id",
    controller: DocumentoController,
    action: "update",
    entity: "Documento"
}
];