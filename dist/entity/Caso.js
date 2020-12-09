"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const Jurisdiccion_1 = require("./Jurisdiccion");
const Distrito_1 = require("./Distrito");
const Fuero_1 = require("./Fuero");
const Juzgado_1 = require("./Juzgado");
const Objeto_1 = require("./Objeto");
const Cliente_1 = require("./Cliente");
const TipoProceso_1 = require("./TipoProceso");
const EstadoCaso_1 = require("./EstadoCaso");
const Instancia_1 = require("./Instancia");
const MovimientoCaso_1 = require("./MovimientoCaso");
const Alerta_1 = require("./Alerta");
const RegistroContable_1 = require("./RegistroContable");
let Caso = class Caso {
    //constructor
    constructor(req) {
        if (req) {
            this.cliente_id = req.body.cliente_id;
            this.fecha_inicio = req.body.fecha_inicio;
            this.detalle = req.body.detalle;
            this.expediente_nro = req.body.expediente_nro;
            this.contraparte_nombre = req.body.contraparte_nombre;
            this.contraparte_dni = req.body.contraparte_dni;
            this.contraparte_dom_real = req.body.contraparte_dom_real;
            this.contraparte_dom_proc = req.body.contraparte_dom_proc;
            this.contraparte_telefono = req.body.contraparte_telefono;
            this.jurisdiccion_id = req.body.jurisdiccion_id;
            this.distrito_id = req.body.distrito_id;
            this.fuero_id = req.body.fuero_id;
            this.juzgado_id = req.body.juzgado_id;
            this.caracter_letrado_id = req.body.caracter_letrado_id;
            this.caracter_cliente_id = req.body.caracter_cliente_id;
            this.mesa = req.body.mesa;
            this.objeto_id = req.body.objeto_id;
            this.instancia_id = req.body.instancia_id;
            this.caratula = req.body.caratula;
            this.estado = req.body.estado;
            this.etapa = req.body.estapa;
            this.fecha_fin = req.body.fecha_fin;
            this.visible = req.body.visible;
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Caso.prototype, "id_caso", void 0);
__decorate([
    typeorm_1.OneToMany(type => MovimientoCaso_1.MovimientoCaso, movimiento => movimiento.caso),
    __metadata("design:type", Array)
], Caso.prototype, "movimientos", void 0);
__decorate([
    typeorm_1.OneToMany(type => Alerta_1.Alerta, alerta => alerta.caso),
    __metadata("design:type", Array)
], Caso.prototype, "alertas", void 0);
__decorate([
    typeorm_1.OneToMany(type => RegistroContable_1.RegistroContable, asiento => asiento.caso),
    __metadata("design:type", Array)
], Caso.prototype, "asientos", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
    }),
    class_validator_1.IsInt({ message: 'La clave de cliente debe ser un entero' }),
    __metadata("design:type", Number)
], Caso.prototype, "cliente_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Cliente_1.Cliente, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'cliente_id',
        referencedColumnName: 'id_cliente'
    }),
    __metadata("design:type", Cliente_1.Cliente)
], Caso.prototype, "cliente", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    class_validator_1.IsISO8601(),
    class_transformer_1.Transform(() => Date),
    __metadata("design:type", Date)
], Caso.prototype, "fecha_inicio", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 500,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 500, { message: 'El detalle debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Caso.prototype, "detalle", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 30,
        nullable: true,
        unique: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 30, { message: 'El numero de expediente debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Caso.prototype, "expediente_nro", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 100, { message: 'El nombre de la contraparte debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Caso.prototype, "contraparte_nombre", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 100, { message: 'El apellido de la contraparte debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Caso.prototype, "contraparte_apellido", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 20,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(7, 20, { message: 'El dni de la contraparte debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Caso.prototype, "contraparte_dni", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 100, { message: 'El domicilio real de la contraparte  debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Caso.prototype, "contraparte_dom_real", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 100, { message: 'El domicilio procesal de la contraparte  debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Caso.prototype, "contraparte_dom_proc", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.MinLength(7),
    __metadata("design:type", String)
], Caso.prototype, "contraparte_telefono", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 300,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 100, { message: 'Los datos del abogado deben tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Caso.prototype, "contraparte_abogado", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true,
        default: 1
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'La clave jurisdiccion debe ser un entero' }),
    __metadata("design:type", Number)
], Caso.prototype, "jurisdiccion_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Jurisdiccion_1.Jurisdiccion, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'jurisdiccion_id',
        referencedColumnName: 'id_jurisdiccion'
    }),
    __metadata("design:type", Jurisdiccion_1.Jurisdiccion)
], Caso.prototype, "jurisdiccion", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'El distrito debe ser un entero' }),
    __metadata("design:type", Number)
], Caso.prototype, "distrito_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Distrito_1.Distrito, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'distrito_id',
        referencedColumnName: 'id_distrito'
    }),
    __metadata("design:type", Distrito_1.Distrito)
], Caso.prototype, "distrito", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'El fuero debe ser un entero' }),
    __metadata("design:type", Number)
], Caso.prototype, "fuero_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Fuero_1.Fuero, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'fuero_id',
        referencedColumnName: 'id_fuero'
    }),
    __metadata("design:type", Fuero_1.Fuero)
], Caso.prototype, "fuero", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'El juzgado debe ser un entero' }),
    __metadata("design:type", Number)
], Caso.prototype, "juzgado_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Juzgado_1.Juzgado, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'juzgado_id',
        referencedColumnName: 'id_juzgado'
    }),
    __metadata("design:type", Juzgado_1.Juzgado)
], Caso.prototype, "juzgado", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
    }),
    class_validator_1.IsInt({ message: 'La clave de carácter del letrado debe ser un entero' }),
    __metadata("design:type", Number)
], Caso.prototype, "caracter_letrado_id", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
    }),
    class_validator_1.IsInt({ message: 'La clave de carácter del cliente debe ser un entero' }),
    __metadata("design:type", Number)
], Caso.prototype, "caracter_cliente_id", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.Length(10, 100, { message: 'La caratula debe tener entre $constraint1 y $constraint2 caracteres' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Caso.prototype, "mesa", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'El objeto es una clave entera' }),
    __metadata("design:type", Number)
], Caso.prototype, "objeto_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Objeto_1.Objeto, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'objeto_id',
        referencedColumnName: 'id_objeto'
    }),
    __metadata("design:type", Objeto_1.Objeto)
], Caso.prototype, "objeto", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'El tipo de proceso es una clave entera' }),
    __metadata("design:type", Number)
], Caso.prototype, "tipo_proceso_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => TipoProceso_1.TipoProceso, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'tipo_proceso_id',
        referencedColumnName: 'id_tipo_proceso'
    })
    // tipo : TipoProceso;
    ,
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'La instancia debe ser un entero' }),
    __metadata("design:type", Number)
], Caso.prototype, "instancia_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Instancia_1.Instancia, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'instancia_id',
        referencedColumnName: 'id_instancia'
    }),
    __metadata("design:type", Instancia_1.Instancia)
], Caso.prototype, "instancia", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.Length(10, 100, { message: 'La caratula debe tener entre $constraint1 y $constraint2 caracteres' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Caso.prototype, "caratula", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        default: 1,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'El estado del caso es una clave entera' }),
    __metadata("design:type", Number)
], Caso.prototype, "estado_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => EstadoCaso_1.EstadoCaso, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'estado_id',
        referencedColumnName: 'id_estado'
    }),
    __metadata("design:type", TipoProceso_1.TipoProceso)
], Caso.prototype, "estado", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'La etapa debe ser un entero' }),
    __metadata("design:type", Number)
], Caso.prototype, "etapa", void 0);
__decorate([
    typeorm_1.Column({
        type: "decimal",
        precision: 14,
        scale: 2,
        default: 0,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsDecimal(),
    __metadata("design:type", Number)
], Caso.prototype, "monto_juicio", void 0);
__decorate([
    typeorm_1.Column({
        type: "date",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsISO8601(),
    class_transformer_1.Transform(() => Date),
    __metadata("design:type", Date)
], Caso.prototype, "fecha_fin", void 0);
__decorate([
    typeorm_1.Column({
        default: true,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], Caso.prototype, "visible", void 0);
Caso = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Caso);
exports.Caso = Caso;
//# sourceMappingURL=Caso.js.map