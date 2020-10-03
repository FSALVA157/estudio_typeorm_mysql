import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import{IsInt, IsOptional, Length} from 'class-validator';


@Entity()
export class Juzgado {

    @PrimaryGeneratedColumn()
    id_juzgado: number;

    @Column({
        type: "varchar",
        length: 100      
     })
    @Length(5,100,{message:'El juzgado debe tener entre $constraint1 y $constraint2 caracteres'})
    juzgado: string;

    @Column({
        type: "int",
        default: 1,
        nullable:true
       })
    @IsOptional()
    @IsInt({message:'La jurisdicción debe ser una clave entera'})
    jurisdiccion_id: number;

    @Column({
        type: "int",
    })
    @IsInt({message:'El fuero debe ser una clave entera'})
    fuero_id: number;

    @Column({
        type: "int",
    })
    @IsInt({message:'El distrito debe ser una clave entera'})
    distrito_id: number;

        

    //constructor
    constructor(req?:any){
        if(req){
            this.juzgado = req.body.juzgado;
           
      }

    }

}
