import "reflect-metadata";
import { createConnection, getConnectionOptions, Entity, ConnectionOptions, AdvancedConsoleLogger } from 'typeorm';
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes/routes";
import {Usuario} from "./entity/Usuario";
import * as path  from "path";
var opciones:ConnectionOptions;

    // read connection options from ormconfig file (or ENV variables)
    //const connectionOptions = async () => await getConnectionOptions();
    // const connectionOptions = getConnectionOptions().then;
    //var connectionOptions:ConnectionOptions = null;
    // const  puerto : number = process.env.PORT || 3000;
    // do something with connectionOptions,
    // for example append a custom naming strategy or a custom logger
    // Object.assign(connectionOptions, {port: puerto});
    // create a connection using modified connection options
    //const connection = await createConnection(connectionOptions);

    const connectionOptions =  async ()=>{
        const response =  await getConnectionOptions();
        return response;
    };
    
    const cop = connectionOptions().then(options => {
        console.warn('valor del __dirname',__dirname);
        const entities_dir = path.resolve(__dirname, 'entity/**/*{.ts,.js}');
        console.warn('LAS ENTITIES ESTAN EN ',entities_dir);

        opciones =  options;
        console.log('mensaje antes',opciones.entities);
        //Object.assign(opciones, { entities: ["src/entity/**/*{.js,.ts}"] }); 
      Object.assign(opciones, { entities: [`${entities_dir}`] });
     console.log('mensaje despues',opciones.entities);
    });




createConnection(opciones).then(async connection => {

    // create express app
    const app = express();

    //middlewares
    //alternativo podria haber usado la linea: app.use(express.json())
    app.use(bodyParser.json());
   

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
   // process.env.PORT = '3005';
     // console.log('el puerto global es ',process.env.PORT);
    app.set('port',process.env.PORT || 3000);
    
  // ...


    
    // start express server
    const puerto_activo = app.get('port');
    app.listen(puerto_activo);

    // insert new users for test
    // await connection.manager.save(connection.manager.create(Usuario, {
    //     dni_usuario : 21633633,
    //     nombre : "xxavier",
    //     apellido : "argentino",
    //     tipo_id : 1,
    //     domicilio_procesal : 'domicilio 1',
    //     matricula : 'm2121',
    //     usuario : 'xxav',
    //     password : 'xx123456',
    //     estudio_id : 1,
    //     email : 'xxav@hotmail.com',
    //     nivel_usuario_id : 1,
    //     fecha_alta : new Date('30/08/2020')
    // }));
    // await connection.manager.save(connection.manager.create(Usuario, {
    //     dni_usuario : 212121,
    //     nombre : "Carlos",
    //     apellido : "Gardel",
    //     tipo_id : 2,
    //     domicilio_procesal : 'domicilio 3',
    //     matricula : 'm8888',
    //     usuario : 'gardel',
    //     password : 'gar123456',
    //     estudio_id : 1,
    //     email : 'gardel@hotmail.com',
    //     nivel_usuario_id : 2,
    //     fecha_alta : new Date('30/08/2020')
    // }));

    console.log(`Express iniciado en puerto ${puerto_activo}. Open http://localhost:${puerto_activo}/usuarios para ver los resultados`);

}).catch(error => console.log(error));
