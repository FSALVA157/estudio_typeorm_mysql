import {getRepository,Like,Not,IsNull} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Etapa } from '../entity/Etapas';



export class EtapaController {

    private EtapaRepository = getRepository(Etapa);

    async all(request: Request, response: Response, next: NextFunction) {
        let offset:number = Number(request.query.offset) || 0;
        let limit:number = Number(request.query.limit) || 10;
        let fields:any = null;
        
        if(request.query.fields){
            let reqFields = request.query.fields;
            fields = reqFields.toString().split(",");
                       
            if(!fields.includes('id_etapa')){
                fields.push('id_etapa')
            }
        
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
                    case 'id_etapa':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'tipo_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'etapa':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'orden':
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
               
                order:{
                    id_etapa:"ASC"
                },
                select:fields,
                skip:offset,
                take:limit,
                where: cond
               };
        
        }else{
            reglas = {
                
                order:{
                    id_objeto:"ASC"
                },
                skip:offset,
                take:limit,
                where: cond
               };
        }

           return await this.EtapaRepository.find(reglas);     
       
    }

    async one(request: Request, response: Response, next: NextFunction) {
        
        return await this.EtapaRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return await this.EtapaRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let etapaToRemove = await this.EtapaRepository.findOne(request.params.id);
       return  await this.EtapaRepository.remove(etapaToRemove);
    }

    async update(request: Request, response: Response, next: NextFunction) {
       
        return await this.EtapaRepository.update(request.params.id,request.body);
    }

}