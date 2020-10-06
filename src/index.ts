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
    //     console.warn('LAS ENTITIES ESTAN EN ',entities_dir);
        
        opciones =  options;
    //    console.log('mensaje antes',opciones.entities);
        //Object.assign(opciones, { entities: ["src/entity/**/*{.js,.ts}"] }); 
        Object.assign(opciones, { entities: [`${entities_dir}`] });
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
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials:true');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Content-Type: text/html; charset=utf-8');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
        
        
        
        // start express server
        const puerto_activo = app.get('port');
        app.listen(puerto_activo);
        

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
