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
const typeorm_encrypted_1 = require("typeorm-encrypted");
let Usuario = class Usuario {
    //constructor
    constructor(req) {
        if (req) {
            this.dni_usuario = req.body.dni_usuario;
            this.nombre = req.body.nombre;
            this.apellido = req.body.apellido;
            this.tipo_id = req.body.tipo_id;
            this.domicilio_procesal = req.body.domicilio_procesal;
            this.matricula = req.body.matricula;
            this.usuario = req.body.usuario;
            this.password = req.body.password;
            this.estudio_id = req.body.estudio_id;
            this.email = req.body.email;
            this.nivel_usuario_id = req.body.nivel_usuario_id;
            this.fecha_alta = req.body.fecha_alta;
            this.fecha_baja = req.body.fecha_baja;
        }
    }
    verificarPassword(pass) {
        return this.password == pass;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Usuario.prototype, "id_usuario", void 0);
__decorate([
    typeorm_1.Column({ type: "int", unsigned: true }),
    class_validator_1.IsInt({ message: 'El dni debe ser un número entero' }),
    class_validator_1.Min(1000000, { message: 'El valor que intenta asignar a Dni no es válido' }),
    __metadata("design:type", Number)
], Usuario.prototype, "dni_usuario", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
    }),
    class_validator_1.Length(4, 50, { message: 'El nombre debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
    }),
    class_validator_1.Length(4, 50, { message: 'El apellido debe tener entre $constraint1 y $constraint2 caracteres en este momento tu texto tiene una longitud de $value letras' }),
    __metadata("design:type", String)
], Usuario.prototype, "apellido", void 0);
__decorate([
    typeorm_1.Column({ type: "int", unsigned: true }),
    class_validator_1.IsInt({ message: 'El tipo debe ser una clave entera' }),
    __metadata("design:type", Number)
], Usuario.prototype, "tipo_id", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(10, 100, { message: 'El domicilio debe tener entre $constraint1 y $constraint2 caracteres en este momento tu texto tiene una longitud de $value letras' }),
    __metadata("design:type", String)
], Usuario.prototype, "domicilio_procesal", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 30,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsAlphanumeric(),
    class_validator_1.MinLength(4),
    __metadata("design:type", String)
], Usuario.prototype, "matricula", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        unique: true
    }),
    class_validator_1.Length(4, 50, { message: 'El usuario debe tener entre $constraint1 y $constraint2 caracteres en este momento tu texto tiene una longitud de $value letras' }),
    __metadata("design:type", String)
], Usuario.prototype, "usuario", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        nullable: false,
        //unique: true
        transformer: new typeorm_encrypted_1.EncryptionTransformer({
            key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
            algorithm: 'aes-256-cbc',
            ivLength: 16,
            iv: 'ff5ac19190424b1d88f9419ef949ae56'
        })
        //select:false //ocultar la columna
    }),
    __metadata("design:type", String)
], Usuario.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: "int", unsigned: true }),
    class_validator_1.IsInt({ message: 'El estudio debe ser una clave entera' }),
    __metadata("design:type", Number)
], Usuario.prototype, "estudio_id", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        unique: true
    }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ type: "int", unsigned: true }),
    class_validator_1.IsInt({ message: 'El nivel debe ser una clave entera' }),
    __metadata("design:type", Number)
], Usuario.prototype, "nivel_usuario_id", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "estado", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    class_validator_1.IsISO8601(),
    class_validator_1.Matches(/^\d{4}([\-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/, { message: 'El dato debe respetar el formato yyyy/mm/dd' }),
    class_transformer_1.Transform(() => Date),
    __metadata("design:type", Date)
], Usuario.prototype, "fecha_alta", void 0);
__decorate([
    typeorm_1.Column({ type: "date", nullable: true }),
    class_validator_1.IsOptional(),
    class_validator_1.IsISO8601(),
    class_validator_1.Matches(/^\d{4}([\-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/, { message: 'El dato debe respetar el formato yyyy/mm/dd' }),
    class_transformer_1.Transform(() => Date),
    __metadata("design:type", Date)
], Usuario.prototype, "fecha_baja", void 0);
Usuario = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Usuario);
exports.Usuario = Usuario;
//# sourceMappingURL=Usuario.js.map