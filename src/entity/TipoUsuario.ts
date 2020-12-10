import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { IsOptional, Length } from 'class-validator';
import { Objeto } from './Objeto';
import { Usuario } from './Usuario';



@Entity()
export class TipoUsuario {

    @PrimaryGeneratedColumn()
    id_tipo_usuario: number;

    @Column({
        type: "varchar",
        length: 50,
        unique:true
     })
    @Length(3,50,{message:'El tipo de usuario debe tener entre $constraint1 y $constraint2 caracteres'})
    tipo_usuario: string;

    @OneToMany(type => Usuario, usuario => usuario.tipoDeUsuario, {cascade: true})
    usuarios: Objeto[]

    

        //constructor
    constructor(req?:any){
        if(req){
            this.id_tipo_usuario = req.body.id_tipo_usuario;
            this.tipo_usuario = req.body.tipo_usuario;
            
      }

    }

}
