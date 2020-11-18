"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const RegistroContable_1 = require("../entity/RegistroContable");
const Caso_1 = require("../entity/Caso");
class BalanceCasoController {
}
BalanceCasoController.estado = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id_caso = parseInt(req.params.id);
    let deuda = 0;
    let debe = 0;
    let haber = 0;
    try {
        const caso = yield typeorm_1.getRepository(Caso_1.Caso).findOneOrFail({ "id_caso": id_caso });
    }
    catch (error) {
        return res.status(400).json({
            message: 'El Expediente o caso no existe'
        });
    }
    try {
        debe = yield typeorm_1.getRepository(RegistroContable_1.RegistroContable)
            .createQueryBuilder("asiento")
            .select("SUM(asiento.monto)", "sum")
            .where("asiento.caso_id = :id AND tipo_registro = 'cargo'", {
            id: id_caso,
        })
            .getRawOne();
        debe = debe['sum'];
        haber = yield typeorm_1.getRepository(RegistroContable_1.RegistroContable)
            .createQueryBuilder("asiento")
            .select("SUM(asiento.monto)", "sum")
            .where("asiento.caso_id = :id AND tipo_registro = 'abono'", {
            id: id_caso,
        })
            .getRawOne();
        haber = haber['sum'];
        deuda = debe - haber;
        return res.status(200).json({
            "deuda total": debe,
            "pagos realizados": haber,
            "saldo": deuda
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
});
exports.default = BalanceCasoController;
//# sourceMappingURL=BalanceCasoController.js.map