import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
//import {Usuario} from "../entity/Usuario";
import{Usuario} from '../entity/Usuario';

export class UsuarioController {

    private userRepository = getRepository(Usuario);

    async all(request: Request, response: Response, next: NextFunction) {
        return await this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return await this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return await this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
       return  await this.userRepository.remove(userToRemove);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        //const nuevoUsuario = this.userRepository.create();
        return await this.userRepository.update(request.params.id,request.body);
    }

}