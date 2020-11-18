import { getRepository, TreeRepository } from 'typeorm';
import { RegistroContable } from '../entity/RegistroContable';
import { Caso } from '../entity/Caso';
import { Request, Response } from 'express';


export default class BalanceCasoController{

    static estado = async (req: Request,res: Response) => {
            const id_caso = parseInt(req.params.id);
            
            let deuda: number = 0;
            let debe: number = 0;
            let haber: number = 0;
            
         
            try {
                const caso = await getRepository(Caso).findOneOrFail({"id_caso": id_caso})
            } catch (error) {
                return res.status(400).json({
                    message: 'El Expediente o caso no existe'
                });
            }

            try {
                debe = await getRepository(RegistroContable)
                            .createQueryBuilder("asiento")
                            .select("SUM(asiento.monto)","sum")
                            .where(
                                "asiento.caso_id = :id AND tipo_registro = 'cargo'",
                                {
                                    id: id_caso,
                                })
                            .getRawOne();
                debe = debe['sum'];

                haber = await getRepository(RegistroContable)
                .createQueryBuilder("asiento")
                .select("SUM(asiento.monto)","sum")
                .where(
                    "asiento.caso_id = :id AND tipo_registro = 'abono'",
                    {
                        id: id_caso,
                    })
                .getRawOne();
                haber = haber['sum'];

                deuda = debe-haber;

                return res.status(200).json({
                    "deuda total": debe,
                    "pagos realizados": haber,
                    "saldo": deuda
                });
                

                
            } catch (error) {
                return res.status(400).json({
                    message: error.message,
                });
            }

        
 
    }
}