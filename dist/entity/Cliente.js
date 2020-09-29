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
let Cliente = class Cliente {
    //constructor
    constructor(req) {
        if (req) {
            this.dni_cuit = req.body.dni_cuit;
            this.categoria_id = req.body.categoria_id;
            this.razon_social = req.body.razon_social;
            this.nombre = req.body.nombre;
            this.apellido = req.body.apellido;
            this.domicilio_real = req.body.domicilio_real;
            this.domicilio_alternativo = req.body.domicilio_alternativo;
            this.provincia = req.body.provincia_id;
            this.departamento = req.body.departamento_id;
            this.localidad = req.body.localidad_id;
            this.telefono_celular = req.body.telefono_celular;
            this.telefono_alternativo = req.body.telefono_alternativo;
            this.ocupacion = req.body.ocupacion;
            this.email = req.body.email;
            this.fecha_alta = req.body.fecha_alta;
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Cliente.prototype, "id_cliente", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 14,
        unique: true
    }),
    class_validator_1.Length(7, 14, { message: 'El dni o cuit debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Cliente.prototype, "dni_cuit", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        unsigned: true
    }),
    class_validator_1.IsInt({ message: 'La Categoria debe ser una clave entera' }),
    __metadata("design:type", Number)
], Cliente.prototype, "categoria_id", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.Length(10, 50, { message: 'La razón social debe tener entre $constraint1 y $constraint2 caracteres' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Cliente.prototype, "razon_social", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
    }),
    class_validator_1.Length(4, 50, { message: 'El nombre debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Cliente.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
    }),
    class_validator_1.Length(4, 50, { message: 'El apellido debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Cliente.prototype, "apellido", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
    }),
    class_validator_1.Length(10, 100, { message: 'El domicilio real debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Cliente.prototype, "domicilio_real", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(10, 100, { message: 'El domicilio alternativo debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Cliente.prototype, "domicilio_alternativo", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.Length(3, 50, { message: 'La razón social debe tener entre $constraint1 y $constraint2 caracteres' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Cliente.prototype, "provincia", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.Length(3, 50, { message: 'La razón social debe tener entre $constraint1 y $constraint2 caracteres' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Cliente.prototype, "departamento", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.Length(3, 50, { message: 'La razón social debe tener entre $constraint1 y $constraint2 caracteres' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Cliente.prototype, "localidad", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
    }),
    class_validator_1.IsAlphanumeric(),
    class_validator_1.MinLength(9),
    __metadata("design:type", String)
], Cliente.prototype, "telefono_celular", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.MinLength(7),
    __metadata("design:type", String)
], Cliente.prototype, "telefono_alternativo", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 50, { message: 'la ocupación debe tener entre $constraint1 y $constraint2 caracteres en este momento' }),
    __metadata("design:type", String)
], Cliente.prototype, "ocupacion", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        unique: true
    }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], Cliente.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    class_validator_1.IsISO8601(),
    class_validator_1.Matches(/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/, { message: 'El dato debe respetar el formato yyyy-mm-dd' }),
    class_transformer_1.Transform(() => Date),
    __metadata("design:type", Date)
], Cliente.prototype, "fecha_alta", void 0);
Cliente = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Cliente);
exports.Cliente = Cliente;
//# sourceMappingURL=Cliente.js.map