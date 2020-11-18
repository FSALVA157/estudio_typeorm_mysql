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
const Caso_1 = require("./Caso");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const CasoExtrajudicial_1 = require("./CasoExtrajudicial");
var TipoTransaccion;
(function (TipoTransaccion) {
    TipoTransaccion["ENTRADA"] = "cargo";
    TipoTransaccion["SALIDA"] = "abono";
})(TipoTransaccion = exports.TipoTransaccion || (exports.TipoTransaccion = {}));
;
let RegistroContable = class RegistroContable {
    //constructor
    constructor(req) {
        if (req) {
            this.caso_id = req.body.caso_id;
            this.caso_id_ext = req.body.caso_id_ext;
            this.tipo_registro = req.body.tipo_registro;
            this.monto = req.body.monto;
            this.fecha = req.body.fecha;
            this.detalle = req.body.detalle;
            this.recibo = req.body.recibo;
            this.tipo_cargo = req.body.tipo_cargo;
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], RegistroContable.prototype, "id_registro", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'La clave de caso debe ser un entero' }),
    __metadata("design:type", Number)
], RegistroContable.prototype, "caso_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Caso_1.Caso, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'caso_id',
        referencedColumnName: 'id_caso'
    }),
    __metadata("design:type", Caso_1.Caso)
], RegistroContable.prototype, "caso", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt({ message: 'La clave de caso extrajudicial debe ser un entero' }),
    __metadata("design:type", Number)
], RegistroContable.prototype, "caso_id_ext", void 0);
__decorate([
    typeorm_1.ManyToOne(type => CasoExtrajudicial_1.CasoExtrajudicial, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'caso_id_ext',
        referencedColumnName: 'id_caso_ext'
    }),
    __metadata("design:type", CasoExtrajudicial_1.CasoExtrajudicial)
], RegistroContable.prototype, "caso_extrajudicial", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: TipoTransaccion,
        nullable: false
    }),
    class_validator_1.IsEnum(TipoTransaccion),
    __metadata("design:type", String)
], RegistroContable.prototype, "tipo_registro", void 0);
__decorate([
    typeorm_1.Column({
        type: "decimal",
        precision: 11,
        scale: 2,
        default: 0,
        nullable: false
    }),
    class_validator_1.IsDecimal(),
    __metadata("design:type", Number)
], RegistroContable.prototype, "monto", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    class_validator_1.IsISO8601(),
    class_transformer_1.Transform(() => Date),
    __metadata("design:type", Date)
], RegistroContable.prototype, "fecha", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 500,
        nullable: false
    }),
    class_validator_1.Length(5, 500, { message: 'El detalle debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], RegistroContable.prototype, "detalle", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 50, { message: 'El recibo debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], RegistroContable.prototype, "recibo", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(2, 50, { message: 'El tipo de cargo debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], RegistroContable.prototype, "tipo_cargo", void 0);
RegistroContable = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], RegistroContable);
exports.RegistroContable = RegistroContable;
//# sourceMappingURL=RegistroContable.js.map