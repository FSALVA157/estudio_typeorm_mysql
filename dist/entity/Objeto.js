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
const TipoProceso_1 = require("./TipoProceso");
const class_validator_1 = require("class-validator");
let Objeto = class Objeto {
    //constructor
    constructor(req) {
        if (req) {
            this.objeto = req.body.objeto;
            this.tipo_id = req.body.tipo_id;
            this.fuero_id = req.body.fuero_id;
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Objeto.prototype, "id_objeto", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100
    }),
    class_validator_1.Length(5, 100, { message: 'El objeto debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Objeto.prototype, "objeto", void 0);
__decorate([
    typeorm_1.Column({
        type: "int"
    }),
    class_validator_1.IsInt({ message: 'El tipo de proceso debe ser una clave entera' }),
    __metadata("design:type", Number)
], Objeto.prototype, "tipo_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => TipoProceso_1.TipoProceso, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'tipo_id',
        referencedColumnName: 'id_tipo_proceso'
    }),
    __metadata("design:type", TipoProceso_1.TipoProceso)
], Objeto.prototype, "tipo_de_proceso", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
    }),
    class_validator_1.IsInt({ message: 'El fuero debe ser una clave entera' }),
    __metadata("design:type", Number)
], Objeto.prototype, "fuero_id", void 0);
Objeto = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Objeto);
exports.Objeto = Objeto;
//# sourceMappingURL=Objeto.js.map