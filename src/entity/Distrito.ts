import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import{IsInt, IsOptional, Length} from 'class-validator';


@Entity()
export class Distrito {

    @PrimaryGeneratedColumn()
    id_distrito: number;

    @Column({
        type: "varchar",
        length: 50,
        unique:true
     })
    @Length(5,50,{message:'El distrito debe tener entre $constraint1 y $constraint2 caracteres'})
    distrito: string;

    @Column({
        type: "int",
        nullable:true,
        default:1
       })
    @IsOptional()
    @IsInt({message:'La clave jurisdiccion debe ser un entero'})
    jurisdiccion_id: number;

    

    //constructor
    constructor(req?:any){
        if(req){
            this.distrito = req.body.distrito;
           
      }

    }

}
