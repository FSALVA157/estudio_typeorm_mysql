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
const Objeto_1 = require("./Objeto");
let TipoProceso = class TipoProceso {
    //constructor
    constructor(req) {
        if (req) {
            this.id_tipo_proceso = req.body.id_tipo_proceso;
            this.tipo_proceso = req.body.tipo_proceso;
            this.etapas = req.body.etapas;
            this.secuencia = req.body.secuencia;
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], TipoProceso.prototype, "id_tipo_proceso", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        unique: true
    }),
    class_validator_1.Length(3, 50, { message: 'El tipo de proceso debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], TipoProceso.prototype, "tipo_proceso", void 0);
__decorate([
    typeorm_1.OneToMany(type => Objeto_1.Objeto, objeto => objeto.tipo_de_proceso, { cascade: true }),
    __metadata("design:type", Array)
], TipoProceso.prototype, "objetos", void 0);
__decorate([
    typeorm_1.Column({
        type: "simple-array",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Array)
], TipoProceso.prototype, "etapas", void 0);
__decorate([
    typeorm_1.Column({
        type: "simple-json",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Object)
], TipoProceso.prototype, "secuencia", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], TipoProceso.prototype, "campo", void 0);
TipoProceso = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], TipoProceso);
exports.TipoProceso = TipoProceso;
//# sourceMappingURL=TipoProceso.js.map