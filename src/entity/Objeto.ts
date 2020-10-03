import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import{IsInt, IsOptional, Length} from 'class-validator';


@Entity()
export class Objeto {

    @PrimaryGeneratedColumn()
    id_objeto: number;

    @Column({
        type: "varchar",
        length: 100      
     })
    @Length(5,100,{message:'El objeto debe tener entre $constraint1 y $constraint2 caracteres'})
    objeto: string;

    @Column({
        type: "int"
         })
    @IsInt({message:'El tipo de proceso debe ser una clave entera'})
    tipo_id: number;

    @Column({
        type: "int",
    })
    @IsInt({message:'El fuero debe ser una clave entera'})
    fuero_id: number;

            

    //constructor
    constructor(req?:any){
        if(req){
            this.objeto = req.body.objeto;
            this.tipo_id = req.body.tipo_id;
            this.fuero_id = req.body.fuero_id;
           
      }

    }

}
