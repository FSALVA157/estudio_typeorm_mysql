import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import{IsInt, IsOptional, Length} from 'class-validator';


@Entity()
export class Instancia {

    @PrimaryGeneratedColumn()
    id_instancia: number;

    @Column({
        type: "varchar",
        length: 50,
        unique:true
     })
    @Length(3,50,{message:'La Instancia debe tener entre $constraint1 y $constraint2 caracteres'})
    instancia: string;

        //constructor
    constructor(req?:any){
        if(req){
            this.instancia = req.body.instancia;
           
      }

    }

}
