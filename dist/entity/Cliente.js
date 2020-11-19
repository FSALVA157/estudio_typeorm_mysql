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
const CategoriaCliente_1 = require("./CategoriaCliente");
const Caso_1 = require("./Caso");
const consulta_1 = require("./consulta");
let Cliente = class Cliente {
    //constructor
    constructor(req) {
        if (req) {
            this.cuit = req.body.cuit;
            this.domicilio_cliente = req.body.domicilio_cliente;
            this.categoria_id = req.body.categoria_id;
            this.razon_social = req.body.razon_social;
            this.provincia_cliente = req.body.provincia_cliente;
            this.departamento_cliente = req.body.departamento_cliente;
            this.localidad_cliente = req.body.localidad_cliente;
            this.nombre = req.body.nombre;
            this.apellido = req.body.apellido;
            this.dni = req.body.dni;
            this.email = req.body.email;
            this.provincia_representante = req.body.provincia_representante;
            this.departamento_representante = req.body.departamento_representante;
            this.localidad_representante = req.body.localidad_representante;
            this.domicilio_representante = req.body.domicilio_representante;
            this.telefono = req.body.telefono;
            this.contacto_alt = req.body.contacto_alt;
            this.telefono_alt = req.body.telefono_alt;
            this.fecha_alta = req.body.fecha_alta;
            this.visible = req.body.visible;
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Cliente.prototype, "id_cliente", void 0);
__decorate([
    typeorm_1.OneToMany(type => Caso_1.Caso, caso => caso.cliente),
    __metadata("design:type", Array)
], Cliente.prototype, "casos", void 0);
__decorate([
    typeorm_1.OneToMany(type => consulta_1.Consulta, consulta => consulta.cliente),
    __metadata("design:type", Array)
], Cliente.prototype, "consultas", void 0);
__decorate([
    typeorm_1.Column({
        type: "int"
    }),
    class_validator_1.IsInt({ message: 'La Categoria debe ser una clave entera' }),
    __metadata("design:type", Number)
], Cliente.prototype, "categoria_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => CategoriaCliente_1.CategoriaCliente, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'categoria_id',
        referencedColumnName: 'id_categoria_cli'
    }),
    __metadata("design:type", CategoriaCliente_1.CategoriaCliente)
], Cliente.prototype, "categoria", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(4, 50, { message: 'La razón social debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Cliente.prototype, "razon_social", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 20,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(7, 20, { message: 'El cuit o cuit debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Cliente.prototype, "cuit", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 100, { message: 'El domicilio  debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Cliente.prototype, "domicilio_cliente", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.Length(3, 50, { message: 'La provincia debe tener entre $constraint1 y $constraint2 caracteres' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Cliente.prototype, "provincia_cliente", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.Length(3, 50, { message: 'El departamento debe tener entre $constraint1 y $constraint2 caracteres' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Cliente.prototype, "departamento_cliente", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.Length(3, 50, { message: 'La localidad debe tener entre $constraint1 y $constraint2 caracteres' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Cliente.prototype, "localidad_cliente", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
    }),
    class_validator_1.Length(2, 50, { message: 'El nombre debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Cliente.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
    }),
    class_validator_1.Length(2, 50, { message: 'El apellido debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Cliente.prototype, "apellido", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 20,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(7, 20, { message: 'El dni debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Cliente.prototype, "dni", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], Cliente.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.Length(3, 50, { message: 'La provincia debe tener entre $constraint1 y $constraint2 caracteres' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Cliente.prototype, "provincia_representante", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.Length(3, 50, { message: 'El departamento debe tener entre $constraint1 y $constraint2 caracteres' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Cliente.prototype, "departamento_representante", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.Length(3, 50, { message: 'La localidad debe tener entre $constraint1 y $constraint2 caracteres' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Cliente.prototype, "localidad_representante", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 100, { message: 'El domicilio alternativo debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Cliente.prototype, "domicilio_representante", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Cliente.prototype, "telefono", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Cliente.prototype, "telefono_alt", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 200, { message: 'el contacto alternativo debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Cliente.prototype, "contacto_alt", void 0);
__decorate([
    typeorm_1.Column({
        type: "date",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsISO8601(),
    class_validator_1.Matches(/^\d{4}([\-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/, { message: 'El dato debe respetar el formato yyyy-mm-dd' }),
    class_transformer_1.Transform(() => Date),
    __metadata("design:type", Date)
], Cliente.prototype, "fecha_alta", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], Cliente.prototype, "visible", void 0);
Cliente = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Cliente);
exports.Cliente = Cliente;
//# sourceMappingURL=Cliente.js.map