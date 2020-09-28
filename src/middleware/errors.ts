import { ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { Error400 } from '../errors/Error400';

export const middleware = (err:any,req:Request,res:Response,next:NextFunction)=>{
    console.log('INGRESANDO A MIDDLEWARE');
   
    if(err instanceof Array){
       
            res.status(400).json(err);
       
    }else if(err.status === 404){
            //res.status(404).json('ERROR PERSONALIZADO DE RESPUESTA VACIA');
             res.status(err.status).json(err);
    }else if (err.name === 'QueryFailedError'){
            let error400 = new Error400(err);
            res.status(error400.status).json(
                //error400
                {
                    name: error400.name,
                    status: error400.status,
                    message:error400.message
                }
                );


        }else if(err instanceof Error400){
            res.status(err.status).json(
                //error400
                {
                    name: err.name,
                    status: err.status,
                    message:err.message
                }
                );
        
        }
        else{
            res.status(500).json(
               {
                status:'Error',
                message:'Error capturado en el middleware: ' + err
            }
            );

        // res.status(500).json({
        //     status:'Error',
        //     message:'Error capturado en el middleware: ' + err.message
        // });
    }

}

