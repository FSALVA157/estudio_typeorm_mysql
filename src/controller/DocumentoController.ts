import {getRepository,Like,Not,IsNull} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Documento } from '../entity/Documento';
import * as fs from "fs-extra";
import  * as path  from "path";


export class DocumentoController {

    private DocumentoRepository = getRepository(Documento);

    async all(request: Request, response: Response, next: NextFunction) {
        let offset:number = Number(request.query.offset) || 0;
        let limit:number = Number(request.query.limit) || 10;
        let fields:any = null;
        
        if(request.query.fields){
            let reqFields = request.query.fields;
            fields = reqFields.toString().split(",");
                       
            if(!fields.includes('id_documento')){
                fields.push('id_documento')
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
                    case 'id_documento':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'caso_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'fecha':
                        cond[nombreCampo] = ExpresionAvanzadaFechas(arreglo[campo]);
                        break; 
                    case 'titulo':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'detalle':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'url':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'folio':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'usuario_id':
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
                relations: ["caso"],
                order:{
                    id_documento:"DESC"
                },
                select:fields,
                skip:offset,
                take:limit,
                where: cond
               };
        
        }else{
            reglas = {
                relations: ["caso"],
                order:{
                    id_documento:"DESC"
                },
                skip:offset,
                take:limit,
                where: cond
               };
        }

        //    return await this.DocumentoRepository.find(reglas);     
        return await this.DocumentoRepository.findAndCount(reglas);     
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return await this.DocumentoRepository.findOne(request.params.id);
    }

   
    async save(request: Request, response: Response, next: NextFunction) {
        //en este controller en especial debo armar una instancia de documento antes del save
        
        let data = new Documento(request);
        return await this.DocumentoRepository.save(data);
      
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let documentToRemove = await this.DocumentoRepository.findOne(request.params.id);
        if(documentToRemove){
            
                fs.unlink(path.resolve(documentToRemove.url)).then().catch(error=>{
                    console.log('No existe el archivo referenciado no se ha eliminado ningun pdf! pero si el registro de tabla');
                });
            
        }
       return await this.DocumentoRepository.remove(documentToRemove);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        //en este caso en específico no permitire la actualización de la url del archivo pues en ese caso es mejor hacer un delete y carga nueva
        //entonces en caso de recibir el campo url voy a lanzar un error
        if(request.body.url){
            response.json({
                message: "NO esta permitido actualizar la url del archivo almacenado, se recomienda eliminar y cargar nuevamente"
            });
        }else{

            return await this.DocumentoRepository.update(request.params.id,request.body);
        }
       
    }

}