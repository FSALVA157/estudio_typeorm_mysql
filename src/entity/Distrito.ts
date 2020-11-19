import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Fuero } from './Fuero';
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

    @ManyToMany(() => Fuero)
    @JoinTable()
    fueros: Fuero[]


    

    //constructor
    constructor(req?:any){
        if(req){
            this.distrito = req.body.distrito;
            this.jurisdiccion_id = req.body.jurisdiccion_id;
      }

    }

}
