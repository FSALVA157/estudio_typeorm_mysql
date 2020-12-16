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
const class_validator_1 = require("class-validator");
let Alerta = class Alerta {
    //constructor
    constructor(req) {
        if (req) {
            this.fecha = req.body.fecha;
            this.detalle = req.body.detalle;
            this.juzgado = req.body.juzgado;
            this.estado = req.body.estado;
            this.caso_id = req.body.caso_id;
            this.visible = req.body.visible;
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Alerta.prototype, "id_alerta", void 0);
__decorate([
    typeorm_1.Column({ type: "datetime" }),
    class_validator_1.IsISO8601(),
    __metadata("design:type", Date)
], Alerta.prototype, "fecha", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 500,
    }),
    class_validator_1.Length(2, 500, { message: 'El detalle de la alerta debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Alerta.prototype, "detalle", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(2, 100, { message: 'El juzgado debe tener entre $constraint1 y $constraint2 caracteres' }),
    __metadata("design:type", String)
], Alerta.prototype, "juzgado", void 0);
__decorate([
    typeorm_1.Column({
        default: true,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], Alerta.prototype, "estado", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
    }),
    class_validator_1.IsInt({ message: 'La clave de enlace con CASO debe ser un entero' }),
    __metadata("design:type", Number)
], Alerta.prototype, "caso_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Caso_1.Caso, { eager: true }),
    typeorm_1.JoinColumn({
        name: 'caso_id',
        referencedColumnName: 'id_caso'
    }),
    __metadata("design:type", Caso_1.Caso)
], Alerta.prototype, "caso", void 0);
__decorate([
    typeorm_1.Column({
        default: true,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], Alerta.prototype, "visible", void 0);
__decorate([
    typeorm_1.DeleteDateColumn(),
    __metadata("design:type", Date)
], Alerta.prototype, "fecha_baja", void 0);
Alerta = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Alerta);
exports.Alerta = Alerta;
//# sourceMappingURL=Alerta.js.map