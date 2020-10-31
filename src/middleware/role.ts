
import { Request,Response,NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Usuario } from '../entity/Usuario';

export const checkRole = (roleData: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const {userId} = res.locals.jwtPayload; 
        const userRepository = getRepository(Usuario);
        let user: Usuario;

        try {
            user = await userRepository.findOneOrFail(userId);
        } catch (error) {
            return res.status(401).send({message: 'No cuenta con las credenciales necesarias'});    
        }

        //check
        const {role} = user; 
        if(roleData === role){
                next();
        }else{
            res.status(401).send({message: 'No cuenta con las credenciales necesarias'});
        }

    }

}