import {getRepository,Like,Not,IsNull,Between} from "typeorm";
import {NextFunction, Request, Response} from "express";
import{Usuario} from '../entity/Usuario';
import {Transform} from 'class-transformer';

export class UsuarioController {

    private userRepository = getRepository(Usuario);

    async all(request: Request, response: Response, next: NextFunction) {
        let offset:number = Number(request.query.offset) || 0;
        let limit:number = Number(request.query.limit) || 10;
        
        let fields:any =  ["id_usuario","dni_usuario","nombre","apellido","tipo_id","domicilio_procesal","matricula","usuario","estudio_id","email","role","estado","fecha_alta","fecha_baja"];
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
                
                let nombreCampo = campo.toString();
                switch (nombreCampo) {
                    case 'id_usuario':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'dni_usuario':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'nombre':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'apellido':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'tipo_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;     
                    case 'domicilio_procesal':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);
                        break;
                    case 'matricula':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;    
                    case 'usuario':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;    
                    case 'estudio_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'email':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;    
                    case 'role':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'estado':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;    
                    case 'fecha_alta':
                        cond[nombreCampo] = ExpresionAvanzadaFechas(arreglo[campo]);
                        break; 
                    case 'fecha_baja':
                        cond[nombreCampo] = ExpresionAvanzadaFechas(arreglo[campo]);
                        //cond[nombreCampo] = arreglo[campo];
                        break;       


                    default:
                        break;
                }
                
            }
        }
     //   console.log('EL ARREGLO NUEVO ES ESTE',cond);
                
        return await this.userRepository.find({
            select:fields,
            relations: ['tipoDeUsuario'],
            order:{
                apellido:"ASC"
            },
            skip:offset,
            take:limit,
            where: cond
            
            
        });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        //  return await this.userRepository.findOne(request.params.id);
        try {
            let respuesta = await this.userRepository.findOneOrFail(request.params.id);
            delete respuesta['password'];
            return respuesta
            
        } catch (error) {
            throw error;
        }
    }    
        
    async save(request: Request, response: Response, next: NextFunction) {
       // let nuevoUsuario = new Usuario(request.body);
        let respuesta =  await this.userRepository.save(request.body);
       // eliminar el campo password para que no se exponga en la respuesta
        delete respuesta['password'];
        //console.log(respuesta);
        return respuesta;
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
       return  await this.userRepository.remove(userToRemove);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        //const nuevoUsuario = this.userRepository.create();
        return await this.userRepository.update(request.params.id,request.body);
    }

}