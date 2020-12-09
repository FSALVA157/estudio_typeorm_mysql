
import { Request,Response,NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Usuario } from '../entity/Usuario';

export const checkRole = (roleData: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log('RES.LOCALS.JWTPAYLOAD: ',res.locals.jwtPayload);
        const {id_usuario} = res.locals.jwtPayload.usuario; 
        const userRepository = getRepository(Usuario);
        let user: Usuario;

        try {
            console.log('ID_USUARIO', id_usuario);
            user = await userRepository.findOneOrFail(id_usuario);
            console.log("DATA DE USUARIO DE LA BD: ",user);
        } catch (error) {
            return res.status(401).send({message: 'No cuenta con las credenciales necesarias'});    
        }

        //check
        const {role} = user; 
        console.log('EL ROLE DE LA BASE DE DATOS ES ', role);
        console.log('EL ROLE PARAMETRO ES ', roleData);
        if(roleData === role){
                next();
        }else{
            res.status(401).send({message: 'No cuenta con las credenciales necesarias'});
        }

    }

}