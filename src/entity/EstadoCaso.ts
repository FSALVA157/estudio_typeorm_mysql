import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import{Length} from 'class-validator';


@Entity()
export class EstadoCaso {

    @PrimaryGeneratedColumn()
    id_estado: number;

    @Column({
        type: "varchar",
        length: 50,
        unique:true
     })
    @Length(5,50,{message:'El estado es un texto que debe tener entre $constraint1 y $constraint2 caracteres'})
    estado_caso: string;

        

    //constructor
    constructor(req?:any){
        if(req){
            this.estado_caso = req.body.estado_caso;
           
      }

    }

}