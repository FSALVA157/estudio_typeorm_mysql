import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import{IsInt, IsOptional, Length} from 'class-validator';


@Entity()
export class ObjetoExtrajudicial {

    @PrimaryGeneratedColumn()
    id_objeto_ext: number;

    @Column({
        type: "varchar",
        length: 100      
     })
    @Length(5,100,{message:'El objeto debe tener entre $constraint1 y $constraint2 caracteres'})
    objeto_ext: string;

              

    //constructor
    constructor(req?:any){
        if(req){
            this.objeto_ext = req.body.objeto_ext;
            
           
      }

    }

}
