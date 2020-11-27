import { Request, Response } from 'express';
import config from '../config/config';
import { getRepository } from 'typeorm';
import { RegistroContable,TipoTransaccion } from '../entity/RegistroContable';
import { Caso } from '../entity/Caso';


export default class CalculosController{

    static monto = async (req: Request,res: Response) => {
        let nuevoMonto: Number;
        try {
            const unidadesIus = Number(req.params.ius);
            if(unidadesIus > 0){
                nuevoMonto = unidadesIus * config.IUS;
            }else{
                return res.status(400).json({
                    message: 'El valor de las unidades ius debe ser un número positivo'
                });
            }

            return res.status(200).json({
                "monto": nuevoMonto,
                "detalle": `el monto: ${nuevoMonto} ha sido calculado con valor ius: $ ${config.IUS} multiplicado por ${unidadesIus} unidades ius`
            });
            
        } catch (error) {
            return res.status(400).json({
                message: error.message,
            });
        }
        
    }

    static cargos = async (req: Request, res: Response) => {
        const data = req.body;
        let montoAux: Number;
        let monto_juicio;
        let caso: Caso;
        try {
            //control de parametros
            if(!data.id || !data.porc){
                return res.status(400).json({
                    message: "El cálculo requiere parámetro 'id' y 'porc'"
                });
            };
            const id = Number(data.id)
            //verificar si el caso tiene monto fijado
            async function buscarMontoJuicion(id: Number ){
                let monto_obtenido;
                try {
                    const casoRepo = getRepository(Caso); 
                    caso = await casoRepo.findOneOrFail({
                        id_caso: data.id
                     });
                    console.log('EL MONTO OBTENIDO DESDE LA BD ES: ',caso.monto_juicio);
                    monto_obtenido = caso.monto_juicio;
                    if((monto_obtenido != null) && (monto_obtenido > 0)){
                        return monto_obtenido;
                    }else{
                        throw Error();
                        
                    }
                     
             } catch (error) {
                 throw new Error('No existe monto de juicio establecido para el caso que intenta calcular un nuevo cargo, establezca un monto pues de este depende el cáculo porcentual');
                
                }
            }

            

            //calculos
            let porcentaje = Number(data.porc);
            
            if(porcentaje > 0){
                monto_juicio = await buscarMontoJuicion(id);
                porcentaje = porcentaje/100;
                montoAux = monto_juicio * porcentaje
                return res.status(200).json({
                    "monto": montoAux,
                    "detalle": `el cargo: $ ${montoAux} ha sido calculado con valor monto de juicio: $ ${monto_juicio} del cual se ha extraido un porcentaje del ${data.porc}%`
                });
            }else{
                throw new Error('El parámetro porcentaje debe ser un número');
                // return res.status(400).json({
                //     message: 'El parámetro porcentaje debe ser un número positivo'
                // });
            }


        } catch (error) {
            res.status(404).json({
                message: error.message
            });
        }

    }

    static plan = async (req: Request,res: Response) => {
        const data = req.body;
        let montoTotal: number;
        let monto_juicio;
        let montoCuota: number;
        let asiento: RegistroContable;
        let arrayCuotas: RegistroContable[] = [];
        let fechaVencimiento: Date;
        try {
            //control de parametros
            if(!data.id || !data.porc || !data.cuotas){
                return res.status(400).json({
                    message: "El cálculo requiere parámetros: 'cuotas', 'id' y 'porc'"
                });
            };
            const id = Number(data.id)
            //verificar si el caso tiene monto fijado
            async function buscarMontoJuicion(id: Number ){
                try {
                    const casoRepo = getRepository(RegistroContable); 
                    asiento = await casoRepo.findOneOrFail({
                        caso_id: data.id,
                        tipo_cargo: 'monto_juicio'
                    });
                   // console.log(asiento);
                    return asiento.monto;
                     
             } catch (error) {
                 throw new Error('No existe monto de juicio establecido para el caso que intenta calcular un plan de pagos, establezca un monto pues de este depende el cáculo porcentual');
                
                }
            }

            //calculos
            let porcentaje = Number(data.porc);
            let cuotas = parseInt(data.cuotas);
            if((porcentaje > 0) && (cuotas > 0)){
                monto_juicio = await buscarMontoJuicion(id);
                console.log('PORCENTAJE: ',porcentaje,'MONTO DEL JUICIO: ',monto_juicio,'NUMERO DE CUOTAS: ',cuotas);
                porcentaje = porcentaje/100;
                montoTotal = (Number(monto_juicio) * Number(porcentaje)) + Number(monto_juicio);
                montoCuota = montoTotal/cuotas;
                //calculo de las cuotas
                for (let index = 0; index < cuotas; index++) {
                    console.log('ENTRANDO AL  FOR');
                    
                    //calculo fecha de vencimiento
                    fechaVencimiento = new Date();

                    let newCuota = new RegistroContable();
                    newCuota.caso_id = id;
                    newCuota.tipo_registro = TipoTransaccion.ENTRADA;
                    newCuota.monto = montoCuota;
                    newCuota.fecha = fechaVencimiento;
                    newCuota.detalle = `cuota Nº : ${index + 1} de plan de pago de (tipo_cargo), monto de cuota: $ ${montoCuota} calculado con un recargo del  ${data.porc}%, monto total: $ ${montoTotal}`,
                    newCuota.recibo = 'sin recibo';
                    newCuota.tipo_cargo = 'no definido';
                    
                    
                    console.log(newCuota);
                    arrayCuotas.push(newCuota);
                    console.log('VUELTA',index);
                }
                console.log(arrayCuotas);

                return res.status(200).json({
                    "plan": arrayCuotas
                });
            }else{
                throw new Error('Los parámetros porcentaje y cuotas deben ser números positivos');
                // return res.status(400).json({
                //     message: 'El parámetro porcentaje debe ser un número positivo'
                // });
            }


        } catch (error) {
            res.status(404).json({
                message: error.message
            });
        }

        
    }


}