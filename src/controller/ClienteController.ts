import {getRepository,Like,Not,IsNull} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Caso } from '../entity/Caso';
import { MovimientoCaso } from '../entity/MovimientoCaso';
import { RegistroContable } from '../entity/RegistroContable';
import { Alerta } from '../entity/Alerta';
import { Consulta } from '../entity/consulta';
import { CasoExtrajudicial } from '../entity/CasoExtrajudicial';
import { AlertaExtra } from '../entity/AlertaExtra';
import{Cliente} from '../entity/Cliente';


export class ClienteController {

    private clientRepository = getRepository(Cliente);

    async all(request: Request, response: Response, next: NextFunction) {
        let offset:number = Number(request.query.offset) || 0;
        let limit:number = Number(request.query.limit) || 10;
        let fields:any = null;
        // let fields:any =  ["id_cliente","dni_cuit","categoria_id","razon_social","nombre","apellido","domicilio_real","domicilio_alternativo","provincia","departamento","localidad","telefono_celular","telefono_alternativo","ocupacion","email","fecha_alta"];
        if(request.query.fields){
            let reqFields = request.query.fields;
            fields = reqFields.toString().split(",");
                       
            if(!fields.includes('id_cliente')){
                fields.push('id_cliente')
            }
            // if(!fields.includes('apellido')){
            //     fields.push('apellido')
            // }
        };
                
        //funcion que devuelve la expresion de las consultas de parametros strings con funciones avanzadas de filtros (LIKE,NOT,IN)
    
        function ExpresionAvanzada(campo:String){
            
            if(campo.toUpperCase() == 'NULL'){
                return IsNull();
            }else if(campo.toUpperCase() == 'NOT NULL'){
                return Not(IsNull());
            }
    
            if(campo.toUpperCase().startsWith('NOT ')){
                campo = campo.slice(4);
                if(campo.toUpperCase().startsWith('LIKE ')){
                    campo = campo.slice(5)
                    return Not(Like('%'+campo+'%'));
                }else{
                    //campo = campo.slice(4);
                    return Not(campo);
                }
            }else{
                if(campo.toUpperCase().startsWith('LIKE ')){
                    campo = campo.slice(5)
                    return Like('%'+campo+'%');
                }else{
                    return campo;
                }
    
            }
    
        }
        
        function ExpresionAvanzadaFechas(campo:string){
            
            if(campo.toUpperCase() == 'NULL'){
                return IsNull();
            }else if(campo.toUpperCase() == 'NOT NULL'){
                return Not(IsNull());
            }
    
            return campo;            
    
        }
        let arreglo: {} =  request.query;
        
        let cond = new Object();
        for (const campo in arreglo) {
            if (Object.prototype.hasOwnProperty.call(arreglo, campo)) {
                //console.log(`${campo} = ${arreglo[campo]}`);
                //const element = arreglo[campo];
                let nombreCampo = campo.toString();
                switch (nombreCampo) {
                    case 'id_cliente':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'categoria_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'razon_social':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'cuit':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'domicilio_cliente':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'provincia_cliente':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                        break;     
                    case 'departamento_cliente':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                        break;     
                    case 'localidad_cliente':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                        break;     
                    case 'nombre':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'apellido':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'dni':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'email':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;    
                   case 'provincia_representante':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                        break;     
                    case 'departamento_representante':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                        break;     
                    case 'localidad_representante':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                        break;     
                    case 'domicilio_representante':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'telefono':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                        break;
                    case 'telefono_alt':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                        break;
                    case 'contacto_alt':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;    
                    case 'fecha_alta':
                        cond[nombreCampo] = ExpresionAvanzadaFechas(arreglo[campo]);
                        break;
                    case 'visible':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;    
                    
                    default:
                        break;
                }
                
            }
        }
        
        let reglas:Object;
        if(fields != null){
            
            reglas = {
                relations: ["casos","consultas","casos_extra"],
                order:{
                    id_cliente:"DESC",
                },
                select:fields,
                skip:offset,
                take:limit,
                where: cond
               };
        
        }else{
            reglas = {
                relations: ["casos","consultas","casos_extra"],
                order:{
                    id_cliente:"DESC",
                },
                skip:offset,
                take:limit,
                where: cond
               };
        }

       //    return await this.clientRepository.find(reglas);     
       return await this.clientRepository.findAndCount(reglas);     
       
    }

    async one(request: Request, response: Response, next: NextFunction) {
        
        return await this.clientRepository.findOne(request.params.id,{relations:['casos']});
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return await this.clientRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
//         //     let userToRemove = await this.clientRepository.findOne(request.params.id);
//         //    return  await this.clientRepository.remove(userToRemove);
//         //borrando las causas relacionadas con el cliente
        
//         //funcion1: se ocupa de borrar las consultas
//         async function removeConsultas(){
//             const consultaRepo = getRepository(Consulta);
//             await consultaRepo.softDelete({
//                 cliente_id: Number(request.params.id)
//             });
//         }
        
//         //function2: se ocupad e borrar los casos extrajudiciales y sus hijos
//         async function removeCasosExtra(){
//             const asientoRepo = getRepository(RegistroContable);
//             const alertaExtRepo = getRepository(AlertaExtra);
//             const casosExtraRepo = getRepository(CasoExtrajudicial);
//             const casos_extra:CasoExtrajudicial[] = await casosExtraRepo.find({
//                 where: {
//                     cliente_id: Number(request.params.id)
//                 },
//                 relations: ["asientos","alertasExtra"]
//             });
            
//             casos_extra.forEach(async extra => {
//                    extra.asientos.forEach(async asiento => {
//                         await asientoRepo.softDelete({id_registro: Number(asiento.id_registro)});
//                     });
//                     extra.alertasExtra.forEach(async alerta => {
//                         alertaExtRepo.softDelete({
//                             id_alerta_extra: Number(alerta.id_alerta_extra)
//                         });
//             });
//             await casosExtraRepo.softDelete({id_caso_ext: Number(extra.id_caso_ext)});
//                 });
//         }
        
//         //function3: Se ocupa de borrar los casos y sus hijos
//         async function removeCasos(){
//             const movimientoRepo = getRepository(MovimientoCaso);
//             const asientoRepo = getRepository(RegistroContable);
//             const alertaRepo = getRepository(Alerta);
//             const casosRepo = getRepository(Caso);
//             const casos:Caso[] = await casosRepo.find({
//                 where: {
//                     cliente_id: Number(request.params.id)
//                 },
//                 relations: ["movimientos","alertas","asientos"],
//             });
            
//             casos.forEach(async caso => {
                
//                 caso.movimientos.forEach(async movimiento => {
//                        await movimientoRepo.softDelete({id_mov_caso: Number(movimiento.id_mov_caso)});
//                 });
//                 caso.asientos.forEach(async asiento => {
//                    await asientoRepo.softDelete({id_registro: Number(asiento.id_registro)});
//                 });
//                 caso.alertas.forEach(async alerta => {
//                    await alertaRepo.softDelete({id_alerta: Number(alerta.id_alerta)});
//                 });
//                await casosRepo.softDelete({id_caso: Number(caso.id_caso)});
//             // return     {
//             //         casos: caso.etapas,
//             //         movimientos: caso.movimientos,
//             //         alertas: caso.alertas
//             //     }
//             });
//         }
        
//     //casosRepo.softDelete({cliente_id: Number(request.params.id)});
//     //casosRepo.restore({cliente_id: Number(request.params.id)});
//     //bloque destinado a tratar casos extra

        

//     //fin bloque de casos extra

//     //return casos;
//     //removeConsultas();
//    // removeCasosExtra();
//   //  removeCasos();

  
//       return await this.clientRepository.softDelete({id_cliente: Number(request.params.id)});
        let cliente_id = Number(request.params.id)
        return await this.clientRepository.query(`CALL SP_SOFTDELETE_CLIENTE(${cliente_id})`);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        //const nuevoUsuario = this.userRepository.create();
        return await this.clientRepository.update(request.params.id,request.body);
    }

}