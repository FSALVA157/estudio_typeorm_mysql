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
const class_transformer_1 = require("class-transformer");
const Cliente_1 = require("./Cliente");
const class_validator_1 = require("class-validator");
let Consulta = class Consulta {
    //constructor
    constructor(req) {
        if (req) {
            this.cliente_id = req.body.cliente_id;
            this.fecha = req.body.fecha;
            this.detalle = req.body.detalle;
            this.obs = req.body.obs;
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Consulta.prototype, "id_consulta", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: false
    }),
    class_validator_1.IsInt({ message: 'La clave de caso debe ser un entero' }),
    __metadata("design:type", Number)
], Consulta.prototype, "cliente_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Cliente_1.Cliente, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'cliente_id',
        referencedColumnName: 'id_cliente'
    }),
    __metadata("design:type", Cliente_1.Cliente)
], Consulta.prototype, "cliente", void 0);
__decorate([
    typeorm_1.Column({
        type: "date",
        nullable: false
    }),
    class_validator_1.IsISO8601(),
    class_transformer_1.Transform(() => Date),
    __metadata("design:type", Date)
], Consulta.prototype, "fecha", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 500,
        nullable: false
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 500, { message: 'El detalle debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Consulta.prototype, "detalle", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 100, { message: 'Una observación debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Consulta.prototype, "obs", void 0);
Consulta = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Consulta);
exports.Consulta = Consulta;
//# sourceMappingURL=consulta.js.map