import {Request,Response,NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { Usuario } from '../entity/Usuario';


export const checkJwt = (req: Request, res:Response, next: NextFunction) => {
    const token = <string>req.headers['auth'];
    let jwtPayload;
    let newUser = new Usuario();
    try {
        jwtPayload = <any> jwt.verify(token,config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
        
    } catch (error) {
        return res.status(401).send({
            message: 'Ingreso No Autorizado'
        });
    }
    
    
    newUser = jwtPayload.usuario;
    //delete newUser['password'];
    //console.log('ESTE ES EL PAYLOAD',newUser);
    const newToken = jwt.sign({usuario: newUser},config.jwtSecret,{expiresIn:'1h'});
    res.setHeader('token', newToken);

    next();

}
