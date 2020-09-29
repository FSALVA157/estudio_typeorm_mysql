import {getRepository,Like,Not,IsNull} from "typeorm";
import {NextFunction, Request, Response} from "express";
import{Cliente} from '../entity/Cliente';


export class ClienteController {

    private clientRepository = getRepository(Cliente);

    async all(request: Request, response: Response, next: NextFunction) {
        let offset:number = Number(request.query.offset) || 0;
        let limit:number = Number(request.query.limit) || 10;
        
        let fields:any =  ["id_cliente","dni_cuit","categoria_id","razon_social","nombre","apellido","domicilio_real","domicilio_alternativo","provincia_id","departamento_id","localidad_id","telefono_celular","telefono_alternativo","ocupacion","email","fecha_alta"];
        if(request.query.fields){
            let reqFields = request.query.fields;
            fields = reqFields.toString().split(",");
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
                    case 'dni_cuit':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'categoria_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'razon_social':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'nombre':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'apellido':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'domicilio_real':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'domicilio_alternativo':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'provincia_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;     
                    case 'departamento_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;     
                    case 'localidad_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;     
                    case 'telefono_celular':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                        break;
                    case 'telefono_alternativo':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                        break;
                    case 'ocupacion':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;    
                    case 'email':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;    
                    case 'fecha_alta':
                        cond[nombreCampo] = ExpresionAvanzadaFechas(arreglo[campo]);
                        break; 
                    
                    default:
                        break;
                }
                
            }
        }
        console.log('EL ARREGLO NUEVO ES ESTE',cond);
                
        return await this.clientRepository.find({
            select:fields,
            order:{
                apellido:"ASC"
            },
            skip:offset,
            take:limit,
            where: cond
            
            
        });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        
        return await this.clientRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return await this.clientRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.clientRepository.findOne(request.params.id);
       return  await this.clientRepository.remove(userToRemove);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        //const nuevoUsuario = this.userRepository.create();
        return await this.clientRepository.update(request.params.id,request.body);
    }

}