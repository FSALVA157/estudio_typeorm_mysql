import "reflect-metadata";
import 'es6-shim';
import { createConnection, getConnectionOptions, Entity, ConnectionOptions, AdvancedConsoleLogger } from 'typeorm';
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response, NextFunction } from 'express';
import {Routes} from "./routes/routes";
import * as path  from "path";
import {middleware} from "./middleware/errors";
import {validate} from 'class-validator';
import { Usuario } from './entity/Usuario';
import { Cliente } from './entity/Cliente';
import { Error400 } from './errors/Error400';
import { Caso } from './entity/Caso';
import { CasoExtrajudicial } from './entity/CasoExtrajudicial';
import { ObjetoExtrajudicial } from './entity/ObjetoExtrajudicial';
import { TipoProceso } from './entity/TipoProceso';
import { Objeto } from './entity/Objeto';
import { Juzgado } from './entity/Juzgado';
import { Instancia } from './entity/Instancia';
import { Fuero } from './entity/Fuero';
import { EstadoCaso } from './entity/EstadoCaso';
import { Distrito } from './entity/Distrito';
import { CaracterLetrado } from './entity/CaracterLetrado';
import { CategoriaCliente } from './entity/CategoriaCliente';
import { MovimientoCaso } from './entity/MovimientoCaso';
import { TipoMovimiento } from './entity/TipoMovimiento';
import { Alerta } from './entity/Alerta';
import auth from './routes/auth';
import { AlertaExtra } from './entity/AlertaExtra';
import { checkJwt } from './middleware/jwt';
import { UsuarioController } from './controller/UsuarioController';
import { Consulta } from './entity/consulta';
import { RegistroContable } from './entity/RegistroContable';
import balanceCaso from './routes/balanceCaso';
import calculos from './routes/calculos';
import * as cors from 'cors';
import { checkRole } from './middleware/role';
import { CasoController } from './controller/CasoController';
import { TipoUsuario } from './entity/TipoUsuario';
import { Documento } from './entity/Documento';
import multer from "./libs/multer";


process.on('unhandledRejection',(error) => {
    console.log(error);
    throw error;
});

process.on('uncaughtException',(error) => {
    console.log(error);
    throw error;
});




var opciones:ConnectionOptions;

    
    const connectionOptions =  async ()=>{
        const response =  await getConnectionOptions();
        return response;
    };
    
     const cop = connectionOptions().then(options => {
    //     console.warn('valor del __dirname',__dirname);
         const entities_dir = path.resolve(__dirname, 'entity/**/*{.ts,.js}');
         const subscribers_dir = path.resolve(__dirname,'subscriber/**/*{.ts,.js}')
    //     console.warn('LAS ENTITIES ESTAN EN ',entities_dir);
        
        opciones =  options;
    //    console.log('mensaje antes',opciones.entities);
        //Object.assign(opciones, { entities: ["src/entity/**/*{.js,.ts}"] }); 
        Object.assign(opciones, { 
            entities: [`${entities_dir}`],
            subscribers: [`${subscribers_dir}`] 
        });
      //  console.log('mensaje despues',opciones.entities);
    });
    
    
    
    
    createConnection(opciones).then(async connection => {
        
        // create express app
        const app = express();
        
        //middlewares
        //alternativo podria haber usado la linea: app.use(express.json())
        app.use(bodyParser.json());
        //middlwwares de errores
        app.set('port',process.env.PORT || 3000);
        
        // middleware de cabeceras y cors
        app.use(cors());
        // app.use((req, res, next) => {
        //     res.header('Access-Control-Allow-Origin', '*');
        //     res.header('Access-Control-Allow-Credentials:true');
        //     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        //     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        //     res.header('Content-Type: text/html; charset=utf-8');
        //     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        //     next();
        // });
        
        
        
        // start express server
        const puerto_activo = app.get('port');
        app.listen(puerto_activo);
        app.use('/auth',auth);
        app.use('/balance',balanceCaso);
        app.use('/calculos',calculos);
        //validando rutas de usuarios
        app.get('/usuarios',[checkJwt,checkRole('admin')]);
        app.use('/uploads', express.static(path.resolve('/uploads')));
        app.post('/documentos',multer.single('file'));
                    
        
        

        // app.get('/',(req,res) => {
        //         res.sendFile(path.join(__dirname,'views/index.html'));
        // });
        
        // register express routes from defined application routes
        Routes.forEach(route => {
            
            (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {

                //funcion que efectua la consulta deseada
                function getDatos():void{
                    var result = (new (route.controller as any))[route.action](req, res, next);
                        
                    if (result instanceof Promise) {
                      result.then(result => {
                          if(result !== null && result !== undefined) {
                           //   res.send(result);
                           res.status(200).json(result);
                          } else{
                            // res.status(500).json({message:'No Existe el Registro solicitado'});
                            throw new Error400();
                              
                          }  
                      }
                      ).catch(err=>{
                          console.log("ERROR DISPARADO: ",err);
                         // next(err);
                         next(err);
                         
                      });
                      
                  } else if (result !== null && result !== undefined) {
                    res.status(200).json(result);
                  }else{
                      throw new Error400();
                      
                  }

                 }

                try {
                    if(route.method === 'post'){
                        //console.log('EL MODELO UTILIZADO ES ',route.entity);

                        const errorSobreescritura = new Error400({
                           code: 'PELIGRO_SOBREESCRITURA',
                           name: 'Error en el Cuerpo del Request',
                           status : 412,
                           message : 'En POST esta prohibido incluir el id_automatico',
                      });

                             try {
                                 let data;
                                        switch (route.entity) {
                                            case 'Documento':
                                                //console.log('CAPTURA DE REQUEST EN EL INDEX',req.body);
                                                data = new Documento(req);
                                                //console.log(req);
                                                if(req.body.id_documento){
                                                   throw errorSobreescritura;
                                                }else{
                                                    break;

                                                }
                                            // case 'MovimientoCaso':
                                            //     data = new TipoUsuario(req);
                                            //     //console.log(req);
                                            //     if(req.body.id_mov_caso){
                                            //        throw errorSobreescritura;
                                            //     }else{
                                            //         break;

                                            //     }
                                            case 'TipoUsuario':
                                                data = new TipoUsuario(req);
                                                //console.log(req);
                                                if(req.body.id_tipo_usuario){
                                                   throw errorSobreescritura;
                                                }else{
                                                    break;

                                                }
                                            case 'RegistroContable':
                                                data = new RegistroContable(req);
                                                //console.log(req);
                                                if(req.body.id_registro){
                                                   throw errorSobreescritura;
                                                }else{
                                                    break;

                                                }
                                            case 'Consulta':
                                                data = new Consulta(req);
                                                //console.log(req);
                                                if(req.body.id_consulta){
                                                   throw errorSobreescritura;
                                                }else{
                                                    break;

                                                }
                                            case 'Alerta':
                                                data = new Alerta(req);
                                                //console.log(req);
                                                if(req.body.id_alerta){
                                                   throw errorSobreescritura;
                                                }else{
                                                    break;

                                                }
                                            case 'AlertaExtra':
                                                data = new AlertaExtra(req);
                                                //console.log(req);
                                                if(req.body.id_alerta_extra){
                                                    throw errorSobreescritura;
                                                }else{
                                                    break;

                                                }
                                            case 'Usuario':
                                                data = new Usuario(req);
                                                //console.log(req);
                                                if(req.body.id_usuario){
                                                   throw errorSobreescritura;
                                                }else{
                                                    break;

                                                }
                                            case 'Cliente':
                                                //console.log(req);
                                                data = new Cliente(req);
                                                if(req.body.id_cliente){
                                                    throw errorSobreescritura;
                                                 }else{
                                                     break;
 
                                                 }
                                            case 'Caso':
                                                //console.log(req);
                                                data = new Caso(req);
                                                if(req.body.id_caso){
                                                    throw errorSobreescritura;
                                                    }else{
                                                        break;
    
                                                    }
                                            case 'CasoExtrajudicial':
                                                    //console.log(req);
                                                    data = new CasoExtrajudicial(req);
                                                    if(req.body.id_caso_ext){
                                                        throw errorSobreescritura;
                                                        }else{
                                                            break;
        
                                                        }
                                            case 'ObjetoExtrajudicial':
                                                //console.log(req);
                                                data = new ObjetoExtrajudicial(req);
                                                if(req.body.id_objeto_ext){
                                                    throw errorSobreescritura;
                                                    }else{
                                                        break;
    
                                                    }
                                            case 'TipoProceso':
                                                //console.log(req);
                                                data = new TipoProceso(req);
                                                if(req.body.id_tipo_proceso){
                                                    throw errorSobreescritura;
                                                    }else{
                                                        break;
    
                                                    }
                                            case 'Objeto':
                                                //console.log(req);
                                                data = new Objeto(req);
                                                if(req.body.id_objeto){
                                                    throw errorSobreescritura;
                                                    }else{
                                                        break;
    
                                                    }
                                            case 'Juzgado':
                                                //console.log(req);
                                                data = new Juzgado(req);
                                                if(req.body.id_juzgado){
                                                    throw errorSobreescritura;
                                                    }else{
                                                        break;
    
                                                    }
                                            case 'Instancia':
                                                //console.log(req);
                                                data = new Instancia(req);
                                                if(req.body.id_instancia){
                                                    throw errorSobreescritura;
                                                    }else{
                                                        break;
    
                                                    }
                                            case 'Fuero':
                                                //console.log(req);
                                                data = new Fuero(req);
                                                if(req.body.id_fuero){
                                                    throw errorSobreescritura;
                                                    }else{
                                                        break;
    
                                                    }
                                            case 'EstadoCaso':
                                                //console.log(req);
                                                data = new EstadoCaso(req);
                                                if(req.body.id_estado){
                                                    throw errorSobreescritura;
                                                    }else{
                                                        break;
    
                                                    }
                                            case 'Distrito':
                                                //console.log(req);
                                                data = new Distrito(req);
                                                if(req.body.id_distrito){
                                                    throw errorSobreescritura;
                                                    }else{
                                                        break;
    
                                                    }
                                            case 'CaracterLetrado':
                                                //console.log(req);
                                                data = new CaracterLetrado(req);
                                                if(req.body.id_caracter_let){
                                                    throw errorSobreescritura;
                                                    }else{
                                                        break;
    
                                                    }
                                            case 'CategoriaCliente':
                                                //console.log(req);
                                                data = new CategoriaCliente(req);
                                                if(req.body.id_categoria_cli){
                                                    throw errorSobreescritura;
                                                    }else{
                                                        break;
    
                                                    }
                                            case 'MovimientoCaso':
                                                //console.log(req);
                                                data = new MovimientoCaso(req);
                                                if(req.body.id_tipo_mov){
                                                    throw errorSobreescritura;
                                                    }else{
                                                        break;
    
                                                    }
                                            case 'TipoMovimiento':
                                                //console.log(req);
                                                data = new TipoMovimiento(req);
                                                if(req.body.id_caso){
                                                    throw errorSobreescritura;
                                                    }else{
                                                        break;
    
                                                    }
                                
                                            default:
                                                break;
                                        };

                                                                      
                                         validate(data,{validationError:{target:false}}).then(errors => {
                                                                               if(errors.length > 0){
                                                                                    //console.log('EXISTEN ERRORES',errors);
                                                                                    throw errors;
                                                                                
                                                                                                                                                       
                                                                                 }else{
                                                                                      //console.log('NO HAY ERRORES');
                                                                                    getDatos();
                                                                                  }
                                                                             })
                                                                             .catch(err => {
                                                                                 console.log('PASANDO POR EL CATCH DE VALIDACION');
                                                                                 next(err);
                                                                                                                  
                                                                          });
                                                                        
                            
                        } catch (error) {
                                console.log('PASANDO POR CATCH DE IF THEN',error);
                                throw error;
                        }
            
           
                     }else{
                         getDatos();
                   
                   
                     }
                     

                
            } catch (error) {
                console.log('ERROR DISPARADO 2');
                next(error);
                
            }
        });
    });
    
    app.use(middleware);
    
   

    console.log(`Express iniciado en puerto ${puerto_activo}. Open http://localhost:${puerto_activo}/usuarios para ver los resultados`);

}).catch(error => console.log(error));
