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
const Caso_1 = require("./Caso");
let Documento = class Documento {
    //constructor
    constructor(req) {
        if (req) {
            this.caso_id = req.body.caso_id;
            this.fecha = req.body.fecha;
            this.titulo = req.body.titulo;
            this.detalle = req.body.detalle;
            this.url = req.body.url;
            this.folio = req.body.folio;
            this.usuario_id = req.body.usuario_id;
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Documento.prototype, "id_documento", void 0);
__decorate([
    typeorm_1.Column({
        type: "int"
    }),
    class_validator_1.IsInt({ message: 'la clave del caso es un entero' }),
    __metadata("design:type", Number)
], Documento.prototype, "caso_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Caso_1.Caso, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'caso_id',
        referencedColumnName: 'id_caso'
    }),
    __metadata("design:type", Caso_1.Caso)
], Documento.prototype, "caso", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    class_validator_1.IsISO8601(),
    class_transformer_1.Transform(() => Date),
    __metadata("design:type", Date)
], Documento.prototype, "fecha", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(0, 100, { message: 'El titulo no puede superar los 100 caracteres' }),
    __metadata("design:type", String)
], Documento.prototype, "titulo", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 500,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(0, 500, { message: 'El detalle debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Documento.prototype, "detalle", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
    }),
    class_validator_1.Length(5, 100, { message: 'la url no puede ser nula ni menor a 5 caracteres' }),
    __metadata("design:type", String)
], Documento.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'El folio indica el orden al paginar y es un entero' }),
    __metadata("design:type", Number)
], Documento.prototype, "folio", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'La clave de usuario debe ser un entero' }),
    __metadata("design:type", Number)
], Documento.prototype, "usuario_id", void 0);
Documento = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Documento);
exports.Documento = Documento;
//# sourceMappingURL=Documento.js.map