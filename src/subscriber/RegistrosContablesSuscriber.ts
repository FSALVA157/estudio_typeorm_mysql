import { EntitySubscriberInterface, EventSubscriber, InsertEvent, getRepository } from 'typeorm';
import { RegistroContable } from '../entity/RegistroContable';


@EventSubscriber()
export class AsientosSubscriber implements EntitySubscriberInterface {

    // listenTo(){
    //     return RegistroContable;
    // }

    // async afterInsert(event: InsertEvent<RegistroContable>){
    //     let idCaso;
    //     let suma: number;
    //     console.log('OBSERVABLE FUNCIONANDO DESPUES DE INSERTAR: ',event.entity);
    //     if(event.entity.caso_id != null){
    //         idCaso = event.entity.caso_id;
    //         suma = await getRepository(RegistroContable)
    //                     .createQueryBuilder("asiento")
    //                     .select("SUM(asiento.monto)","sum")
    //                     .where("asiento.caso_id = :id",{id: idCaso})
    //                     .getRawOne();
    //     }else{
    //         idCaso = event.entity.caso_id_ext;
    //         suma = await getRepository(RegistroContable)
    //                     .createQueryBuilder("asiento")
    //                     .select("SUM(asiento.monto)","sum")
    //                     .where("asiento.caso_id_ext = :id",{id: idCaso})
    //                     .getRawOne();
    //     }
    //     let aux: number = event.entity.monto;
    //     suma = suma + aux;
    //     console.log('LA SUMA TOTAL ES: ',suma);
                                    
    // }



}
