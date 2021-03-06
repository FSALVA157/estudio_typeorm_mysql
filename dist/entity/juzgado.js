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
const Instancia_1 = require("./Instancia");
const class_validator_1 = require("class-validator");
let Juzgado = class Juzgado {
    //constructor
    constructor(req) {
        if (req) {
            this.juzgado = req.body.juzgado;
            this.jurisdiccion_id = req.body.jurisdiccion_id;
            this.fuero_id = req.body.fuero_id;
            this.distrito_id = req.body.distrito_id;
            this.instancia_id = req.body.instancia_id;
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Juzgado.prototype, "id_juzgado", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100
    }),
    class_validator_1.Length(5, 100, { message: 'El juzgado debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Juzgado.prototype, "juzgado", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        default: 1,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'La jurisdicción debe ser una clave entera' }),
    __metadata("design:type", Number)
], Juzgado.prototype, "jurisdiccion_id", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
    }),
    class_validator_1.IsInt({ message: 'El fuero debe ser una clave entera' }),
    __metadata("design:type", Number)
], Juzgado.prototype, "fuero_id", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
    }),
    class_validator_1.IsInt({ message: 'El distrito debe ser una clave entera' }),
    __metadata("design:type", Number)
], Juzgado.prototype, "distrito_id", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'La instancia debe ser una clave entera' }),
    __metadata("design:type", Number)
], Juzgado.prototype, "instancia_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Instancia_1.Instancia, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'instancia_id',
        referencedColumnName: 'id_instancia'
    }),
    __metadata("design:type", Instancia_1.Instancia)
], Juzgado.prototype, "instancia", void 0);
Juzgado = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Juzgado);
exports.Juzgado = Juzgado;
//# sourceMappingURL=Juzgado.js.map