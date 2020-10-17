import {getRepository,Like,Not,IsNull} from "typeorm";
import {NextFunction, Request, Response} from "express";
import{Caso} from '../entity/Caso';


export class CasoController {

    private casoRepository = getRepository(Caso);

    async all(request: Request, response: Response, next: NextFunction) {
        let offset:number = Number(request.query.offset) || 0;
        let limit:number = Number(request.query.limit) || 10;
        let fields:any = null;
        // let fields:any =  ["id_cliente","dni_cuit","categoria_id","razon_social","nombre","apellido","domicilio_real","domicilio_alternativo","provincia","departamento","localidad","telefono_celular","telefono_alternativo","ocupacion","email","fecha_alta"];
        if(request.query.fields){
            let reqFields = request.query.fields;
            fields = reqFields.toString().split(",");
                       
            if(!fields.includes('id_caso')){
                fields.push('id_caso');
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
                    case 'id_caso':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'cliente_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'fecha_inicio':
                        cond[nombreCampo] = ExpresionAvanzadaFechas(arreglo[campo]);
                        break; 
                    case 'detalle':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'expediente_nro':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'contraparte_nombre':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'contraparte_dni':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'contraparte_dom_real':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'contraparte_dom_procesal':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'contraparte_telefono':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'jurisdiccion_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'distrito_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'fuero_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'juzgado_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'caracter_letrado_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'caracter_cliente_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'mesa':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'objeto_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'tipo_proceso_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'instancia_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;
                    case 'caratula':
                        cond[nombreCampo] = ExpresionAvanzada(arreglo[campo]);  
                        break;
                    case 'estado_id':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;    
                    case 'etapa':
                        cond[nombreCampo] = Number(arreglo[campo]);
                        break;                           
                    case 'fecha_fin':
                        cond[nombreCampo] = ExpresionAvanzadaFechas(arreglo[campo]);
                        break; 
                    
                    default:
                        break;
                }
                
            }
        }
        
        let reglas:Object;
        if(fields != null){
            
            reglas = {
                relations: ["movimientos","alertas"],
                order:{
                    id_caso:"ASC",
                },
                select:fields,
                skip:offset,
                take:limit,
                where: cond
               };
        
        }else{
            reglas = {
                relations: ["movimientos","alertas"],
                order:{
                    id_caso:"ASC",
                },
                skip:offset,
                take:limit,
                where: cond
               };
        }

           return await this.casoRepository.find(reglas);     
       
    }

    async one(request: Request, response: Response, next: NextFunction) {
        
        return await this.casoRepository.findOne(request.params.id,{ relations: ["movimientos","alertas"]});
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return await this.casoRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.casoRepository.findOne(request.params.id);
       return  await this.casoRepository.remove(userToRemove);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        //const nuevoUsuario = this.userRepository.create();
        return await this.casoRepository.update(request.params.id,request.body);
    }

}