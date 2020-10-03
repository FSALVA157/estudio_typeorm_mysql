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
let Caso = class Caso {
    //constructor
    constructor(req) {
        if (req) {
            this.cliente_id = req.body.cliente_id;
            this.fecha_inicio = req.body.fecha_inicio;
            this.detalle = req.body.detalle;
            this.expediente_nro = req.body.expediente_nro;
            this.contraparte_datos = req.body.contraparte_datos;
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
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Caso.prototype, "id_caso", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
    }),
    class_validator_1.IsInt({ message: 'La clave de cliente debe ser un entero' }),
    __metadata("design:type", Number)
], Caso.prototype, "cliente_id", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    class_validator_1.IsISO8601(),
    class_validator_1.Matches(/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/, { message: 'La fecha   debe respetar el formato yyyy-mm-dd' }),
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
        length: 500,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 500, { message: 'El nombre de la otra parte debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Caso.prototype, "contraparte_datos", void 0);
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
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'El distrito debe ser un entero' }),
    __metadata("design:type", Number)
], Caso.prototype, "distrito_id", void 0);
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
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'El juzgado debe ser un entero' }),
    __metadata("design:type", Number)
], Caso.prototype, "juzgado_id", void 0);
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
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'La instancia debe ser un entero' }),
    __metadata("design:type", Number)
], Caso.prototype, "instancia_id", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.Length(10, 50, { message: 'La caratula debe tener entre $constraint1 y $constraint2 caracteres' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Caso.prototype, "caratula", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
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
        type: "date",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsISO8601(),
    class_validator_1.Matches(/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/, { message: 'La fecha   debe respetar el formato yyyy-mm-dd' }),
    class_transformer_1.Transform(() => Date),
    __metadata("design:type", Date)
], Caso.prototype, "fecha_fin", void 0);
Caso = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Caso);
exports.Caso = Caso;
//# sourceMappingURL=Caso.js.map