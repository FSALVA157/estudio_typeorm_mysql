import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import{Length} from 'class-validator';


@Entity()
export class Jurisdiccion {

    @PrimaryGeneratedColumn()
    id_jurisdiccion: number;

    @Column({
        type: "varchar",
        length: 20,
        unique:true
     })
    @Length(5,14,{message:'La Jurisdicción debe tener entre $constraint1 y $constraint2 caracteres'})
    jurisdiccion: string;

    

    //constructor
    constructor(req?:any){
        if(req){
            this.jurisdiccion = req.body.jurisdiccion;
           
      }

    }

}
