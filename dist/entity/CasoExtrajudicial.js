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
const Fuero_1 = require("./Fuero");
const Cliente_1 = require("./Cliente");
const ObjetoExtrajudicial_1 = require("./ObjetoExtrajudicial");
const RegistroContable_1 = require("./RegistroContable");
let CasoExtrajudicial = class CasoExtrajudicial {
    //constructor
    constructor(req) {
        if (req) {
            this.cliente_id = req.body.cliente_id;
            this.fecha_tramite = req.body.fecha_tramite;
            this.detalle = req.body.detalle;
            this.expediente_nro = req.body.expediente_nro;
            this.contraparte_nombre = req.body.contraparte_nombre;
            this.contraparte_dni = req.body.contraparte_dni;
            this.contraparte_domicilio = req.body.contraparte_domicilio;
            this.contraparte_telefono = req.body.contraparte_telefono;
            this.materia_id = req.body.materia_id;
            this.objeto_ext_id = req.body.objeto_ext_id;
            this.mediador = req.body.mediador;
            this.mediacion_domicilio = req.body.mediacion_domicilio;
            this.mediador_telef = req.body.mediador_telef;
            this.fecha_audiencia = req.body.fecha_audiencia;
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CasoExtrajudicial.prototype, "id_caso_ext", void 0);
__decorate([
    typeorm_1.OneToMany(type => RegistroContable_1.RegistroContable, asiento => asiento.caso_extrajudicial),
    __metadata("design:type", Array)
], CasoExtrajudicial.prototype, "asientos", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
    }),
    class_validator_1.IsInt({ message: 'La clave de cliente debe ser un entero' }),
    __metadata("design:type", Number)
], CasoExtrajudicial.prototype, "cliente_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Cliente_1.Cliente, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'cliente_id',
        referencedColumnName: 'id_cliente'
    }),
    __metadata("design:type", Cliente_1.Cliente)
], CasoExtrajudicial.prototype, "cliente", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    class_validator_1.IsISO8601(),
    class_transformer_1.Transform(() => Date),
    __metadata("design:type", Date)
], CasoExtrajudicial.prototype, "fecha_tramite", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 500,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 500, { message: 'El detalle debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], CasoExtrajudicial.prototype, "detalle", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 30,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 30, { message: 'El numero de expediente debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], CasoExtrajudicial.prototype, "expediente_nro", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 100, { message: 'El nombre de la contraparte debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], CasoExtrajudicial.prototype, "contraparte_nombre", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 100, { message: 'El apellido de la contraparte debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], CasoExtrajudicial.prototype, "contraparte_apellido", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 20,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(7, 20, { message: 'El dni de la contraparte debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], CasoExtrajudicial.prototype, "contraparte_dni", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 100, { message: 'El domicilio  de la contraparte  debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], CasoExtrajudicial.prototype, "contraparte_domicilio", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.MinLength(7),
    __metadata("design:type", String)
], CasoExtrajudicial.prototype, "contraparte_telefono", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'La materia debe ser un entero' }),
    __metadata("design:type", Number)
], CasoExtrajudicial.prototype, "materia_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Fuero_1.Fuero, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'materia_id',
        referencedColumnName: 'id_fuero'
    }),
    __metadata("design:type", Fuero_1.Fuero)
], CasoExtrajudicial.prototype, "materia", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'El objeto es una clave entera' }),
    __metadata("design:type", Number)
], CasoExtrajudicial.prototype, "objeto_ext_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => ObjetoExtrajudicial_1.ObjetoExtrajudicial, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'objeto_ext_id',
        referencedColumnName: 'id_objeto_ext'
    }),
    __metadata("design:type", ObjetoExtrajudicial_1.ObjetoExtrajudicial)
], CasoExtrajudicial.prototype, "objeto", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.Length(10, 100, { message: 'El mediador es un texto que debe tener entre $constraint1 y $constraint2 caracteres' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CasoExtrajudicial.prototype, "mediador", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.Length(10, 100, { message: 'El lugar de mediación es un texto que debe tener entre $constraint1 y $constraint2 caracteres' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CasoExtrajudicial.prototype, "mediacion_domicilio", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.Length(10, 50, { message: 'El telefono del mediador es un texto que debe tener entre $constraint1 y $constraint2 caracteres' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CasoExtrajudicial.prototype, "mediador_telef", void 0);
__decorate([
    typeorm_1.Column({
        type: "datetime",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsISO8601(),
    class_transformer_1.Transform(() => Date),
    __metadata("design:type", Date)
], CasoExtrajudicial.prototype, "fecha_audiencia", void 0);
CasoExtrajudicial = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], CasoExtrajudicial);
exports.CasoExtrajudicial = CasoExtrajudicial;
//# sourceMappingURL=CasoExtrajudicial.js.map