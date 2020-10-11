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
let TipoMovimiento = class TipoMovimiento {
    //constructor
    constructor(req) {
        if (req) {
            this.tipo_movimiento = req.body.tipo_movimiento;
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], TipoMovimiento.prototype, "id_tipo_mov", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 50, { message: 'El tipo de momviento debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], TipoMovimiento.prototype, "tipo_movimiento", void 0);
TipoMovimiento = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], TipoMovimiento);
exports.TipoMovimiento = TipoMovimiento;
//# sourceMappingURL=TipoMovimiento.js.map