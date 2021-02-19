import {getRepository,Like,Not,IsNull} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { CaracterLetrado } from '../entity/CaracterLetrado';



export class CaracterLetradoController {

    private caracterRepository = getRepository(CaracterLetrado);

    async all(request: Request, response: Response, next: NextFunction) {
        let offset:number = Number(request.query.offset) || 0;
        let limit:number = Number(request.query.limit) || 10;
        let fields:any = null;
        
        if(request.query.fields){
            let reqFields = request.query.fields;
            fields = reqFields.toString().split(",");
                       
            if(!fields.includes('id_caracter_let')){
                fields.push('id_caracter_let')
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
                    case 'caracter_let':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                                      
                    case 'clave_interna':
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
                    id_caracter_let:"ASC"
                },
                select:fields,
                skip:offset,
                take:limit,
                where: cond
               };
        
        }else{
            reglas = {
                order:{
                    id_caracter_let:"ASC"
                },
                skip:offset,
                take:limit,
                where: cond
               };
        }

           return await this.caracterRepository.find(reglas);     
       
    }

    async one(request: Request, response: Response, next: NextFunction) {
        
        return await this.caracterRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return await this.caracterRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let caracterToRemove = await this.caracterRepository.findOne(request.params.id);
       return  await this.caracterRepository.remove(caracterToRemove);
    }

    async update(request: Request, response: Response, next: NextFunction) {
       
        return await this.caracterRepository.update(request.params.id,request.body);
    }

}