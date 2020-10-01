import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import{Length} from 'class-validator';


@Entity("categoria_cliente")
export class CategoriaCliente {

    @PrimaryGeneratedColumn()
    id_categoria_cli: number;

    @Column({
        type: "varchar",
        length: 20,
        unique:true
     })
    @Length(5,14,{message:'la categoria de cliente debe tener entre $constraint1 y $constraint2 caracteres'})
    categoria_cli: string;

    

    //constructor
    constructor(req?:any){
        if(req){
            this.categoria_cli = req.body.categoria_cli;
           
      }

    }

}
