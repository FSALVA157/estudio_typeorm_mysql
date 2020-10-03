import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import{Length} from 'class-validator';


@Entity()
export class Fuero {

    @PrimaryGeneratedColumn()
    id_fuero: number;

    @Column({
        type: "varchar",
        length: 50,
        unique:true
     })
    @Length(5,50,{message:'El distrito debe tener entre $constraint1 y $constraint2 caracteres'})
    fuero: string;

        

    //constructor
    constructor(req?:any){
        if(req){
            this.fuero = req.body.fuero;
           
      }

    }

}
