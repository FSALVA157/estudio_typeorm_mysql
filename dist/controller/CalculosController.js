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
const config_1 = require("../config/config");
const typeorm_1 = require("typeorm");
const RegistroContable_1 = require("../entity/RegistroContable");
const Caso_1 = require("../entity/Caso");
class CalculosController {
}
//cualquiero monto que deba ser calculado como un producto por valor IUS
CalculosController.monto = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let nuevoMonto;
    try {
        const unidadesIus = Number(req.params.ius);
        if (unidadesIus > 0) {
            nuevoMonto = unidadesIus * config_1.default.IUS;
        }
        else {
            return res.status(400).json({
                message: 'El valor de las unidades ius debe ser un número positivo'
            });
        }
        return res.status(200).json({
            "monto": nuevoMonto,
            "detalle": `el monto: ${nuevoMonto} ha sido calculado con valor ius: $ ${config_1.default.IUS} multiplicado por ${unidadesIus} unidades ius`
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
});
//cualquier monto que se calcule como porcentaje del MONTO DEL JUICIO
CalculosController.cargos = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const data = req.body;
    let montoAux;
    let monto_juicio;
    let caso;
    try {
        //control de parametros
        if (!data.id || !data.porc) {
            return res.status(400).json({
                message: "El cálculo requiere parámetro 'id' y 'porc'"
            });
        }
        ;
        const id = Number(data.id);
        //verificar si el caso tiene monto fijado
        function buscarMontoJuicion(id) {
            return __awaiter(this, void 0, void 0, function* () {
                let monto_obtenido;
                try {
                    const casoRepo = typeorm_1.getRepository(Caso_1.Caso);
                    caso = yield casoRepo.findOneOrFail({
                        id_caso: data.id
                    });
                    console.log('EL MONTO OBTENIDO DESDE LA BD ES: ', caso.monto_juicio);
                    monto_obtenido = caso.monto_juicio;
                    if ((monto_obtenido != null) && (monto_obtenido > 0)) {
                        return monto_obtenido;
                    }
                    else {
                        throw Error();
                    }
                }
                catch (error) {
                    throw new Error('No existe monto de juicio establecido para el caso que intenta calcular un nuevo cargo, establezca un monto pues de este depende el cáculo porcentual');
                }
            });
        }
        //calculos
        let porcentaje = Number(data.porc);
        if (porcentaje > 0) {
            monto_juicio = yield buscarMontoJuicion(id);
            porcentaje = porcentaje / 100;
            montoAux = monto_juicio * porcentaje;
            return res.status(200).json({
                "monto": montoAux,
                "detalle": `el cargo: $ ${montoAux} ha sido calculado con valor monto de juicio: $ ${monto_juicio} del cual se ha extraido un porcentaje del ${data.porc}%`
            });
        }
        else {
            throw new Error('El parámetro porcentaje debe ser un número');
            // return res.status(400).json({
            //     message: 'El parámetro porcentaje debe ser un número positivo'
            // });
        }
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
});
CalculosController.plan = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const data = req.body;
    let montoTotal;
    let monto_juicio;
    let montoCuota;
    let asiento;
    let arrayCuotas = [];
    let fechaVencimiento;
    try {
        //control de parametros
        if (!data.monto || !data.porc || !data.cuotas || !data.id) {
            return res.status(400).json({
                message: "El cálculo requiere parámetros: 'cuotas', 'monto', 'id' y 'porc'"
            });
        }
        ;
        // const id = Number(data.id)
        // //verificar si el caso tiene monto fijado
        // async function buscarMontoJuicion(id: Number ){
        //     try {
        //         const casoRepo = getRepository(RegistroContable); 
        //         asiento = await casoRepo.findOneOrFail({
        //             caso_id: data.id,
        //             tipo_cargo: 'monto_juicio'
        //         });
        //        // console.log(asiento);
        //         return asiento.monto;
        //  } catch (error) {
        //      throw new Error('No existe monto de juicio establecido para el caso que intenta calcular un plan de pagos, establezca un monto pues de este depende el cáculo porcentual');
        //     }
        //}
        //calculos
        let porcentaje = Number(data.porc);
        let cuotas = parseInt(data.cuotas);
        if ((porcentaje > 0) && (cuotas > 0)) {
            //monto_juicio = await buscarMontoJuicion(id);
            monto_juicio = data.monto;
            console.log('PORCENTAJE: ', porcentaje, 'MONTO DEL JUICIO: ', monto_juicio, 'NUMERO DE CUOTAS: ', cuotas);
            porcentaje = porcentaje / 100;
            montoTotal = (Number(monto_juicio) * Number(porcentaje)) + Number(monto_juicio);
            montoCuota = montoTotal / cuotas;
            //calculo de las cuotas
            for (let index = 0; index < cuotas; index++) {
                console.log('ENTRANDO AL  FOR');
                //calculo fecha de vencimiento
                fechaVencimiento = new Date();
                let newCuota = new RegistroContable_1.RegistroContable();
                newCuota.caso_id = data.id;
                newCuota.tipo_registro = RegistroContable_1.TipoTransaccion.ENTRADA;
                newCuota.monto = montoCuota;
                newCuota.fecha = fechaVencimiento;
                newCuota.detalle = `cuota Nº : ${index + 1} de plan de pago de (tipo_cargo), monto de cuota: $ ${montoCuota} calculado con un recargo del  ${data.porc}%, monto total: $ ${montoTotal}`,
                    newCuota.recibo = 'sin recibo';
                newCuota.tipo_cargo = 'no definido';
                console.log(newCuota);
                arrayCuotas.push(newCuota);
                console.log('VUELTA', index);
            }
            console.log(arrayCuotas);
            return res.status(200).json({
                "plan": arrayCuotas
            });
        }
        else {
            throw new Error('Los parámetros porcentaje y cuotas deben ser números positivos');
            // return res.status(400).json({
            //     message: 'El parámetro porcentaje debe ser un número positivo'
            // });
        }
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
});
exports.default = CalculosController;
//# sourceMappingURL=CalculosController.js.map