import {getRepository} from 'typeorm';
import { Request,Response } from 'express';
import{Usuario} from '../entity/Usuario';
import config from '../config/config';
import * as jwt from 'jsonwebtoken';



export default class AuthController {
    static login = async (req: Request,res: Response) => {
        const {usuario,password} = req.body;
        let clave = password;
        if(!(usuario && clave)){
            return res.status(400).json({
                message:"Usuario y Password son requeridos"
            });
        };

        const userRepository = getRepository(Usuario);
        //const userRepository = await getRepository(Usuario).createQueryBuilder().select().addSelect('password').getMany();
        let user: Usuario;

        try {
            user = await userRepository.findOneOrFail({where:{usuario}});


            
        } catch (error) {
            return res.status(400).json({
                message:"(Usuario) o Password incorrecto!"
            });
        }

        if(!user.verificarPassword(clave)){
            return res.status(400).json({
                message:"Usuario o (Password) incorrecto!"
            });
        };
        
        
        const token = jwt.sign(
            {
            usuario: user
            },
            config.jwtSecret,
            {expiresIn: '1h'}
        );

        res.json({
            message: 'OK',
            token,
               });

    };
}

