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
import { Error404 } from './errors/Error404';



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
        
        // ...
        
        
        
        // start express server
        const puerto_activo = app.get('port');
        app.listen(puerto_activo);
        

        
        
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
                            throw new Error404();
                              
                          }  
                      }
                      ).catch(err=>{
                          console.log("ERROR DISPARADO: ");
                         // next(err);
                         next(err);
                         
                      });
                      
                  } else if (result !== null && result !== undefined) {
                    res.status(200).json(result);
                  }else{
                      throw new Error404();
                      
                  }

                 }

                try {
                    if(route.method === 'post'){
                        console.log('EL MODELO UTILIZADO ES ',route.entity);
                             try {
                                 let data;
                                        switch (route.entity) {
                                            case 'Usuario':
                                                data = new Usuario(req);
                                                break;
                                        
                                            default:
                                                break;
                                        }
                                            
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
                                console.log('PASANDO POR CATCH DE IF THEN');
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
