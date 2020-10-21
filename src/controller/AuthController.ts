import {getRepository} from 'typeorm';
import { Request,Response } from 'express';
import{Usuario} from '../entity/Usuario';

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
            //user = await getRepository(Usuario).createQueryBuilder("u").addSelect('password').where("u.usuario = :usu",{usu:usuario}).getOne();
            console.log(user);
        } catch (error) {
            return res.status(400).json({
                message:"(Usuario) o Password incorrecto!"
            });
        }

        if(user.verificarPassword(clave)){
            
            res.send(user);
        }else{
            return res.status(400).json({
                message:"Usuario o (Password) incorrecto!"
            });
        };



    };
}

