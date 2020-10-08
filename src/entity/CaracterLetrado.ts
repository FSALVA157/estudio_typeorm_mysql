import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import{IsInt, IsOptional, Length} from 'class-validator';


@Entity()
export class CaracterLetrado {

    @PrimaryGeneratedColumn()
    id_caracter_let: number;

    @Column({
        type: "varchar",
        length: 50,
        unique:true
     })
    @Length(5,50,{message:'El caracter del letrado debe tener entre $constraint1 y $constraint2 caracteres'})
    caracter_let: string;
    
    @Column({
        type: "int",
       })
    @IsInt({message:'La clave interna es obligatoria y es un número entero'})
    clave_interna: number;

    
    //constructor
    constructor(req?:any){
        if(req){
            this.caracter_let = req.body.caracter_let;
            this.clave_interna = req.body.clave_interna;
      }

    }

}
