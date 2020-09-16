import { ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { Error404 } from '../errors/Error404';

export const middleware = (err:any,req:Request,res:Response,next:NextFunction)=>{
    console.log('INGRESANDO A MIDDLEWARE');
    
    if(err instanceof Array){
       
            res.status(400).json(err);
       
    }else if(err.status === 404){
            //res.status(404).json('ERROR PERSONALIZADO DE RESPUESTA VACIA');
             res.status(err.status).json(err);
    }else{

        res.status(500).json({
            status:'Error',
            message:'Error capturado en el middleware: ' + err.message
        });
    }

}

