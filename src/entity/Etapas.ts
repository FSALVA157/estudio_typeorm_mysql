import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, } from "typeorm";
import { IsInt, Length } from 'class-validator';
import { TipoProceso } from './TipoProceso';



@Entity()
export class Etapa {

    @PrimaryGeneratedColumn()
    id_etapa: number;

    @Column({
        type: "int",
       })
    @IsInt({message:'La clave del tipo de proceso  debe ser un entero'})
    tipo_id: number;

   // relacion con tabla tipo de proceso
    @ManyToOne(type => TipoProceso,{eager : true})
    @JoinColumn({
        name : 'tipo_id',
        referencedColumnName : 'id_tipo_proceso'
    })
    tipo : TipoProceso;

    @Column({
        type: "varchar",
        length: 100,
     })
    @Length(3,100,{message:'La etapa del proceso debe tener entre $constraint1 y $constraint2 caracteres'})
    etapa: string;
   
    @Column({
        type: "int",
       })
    @IsInt({message:'El orden es un numero entero'})
    orden: number;

    

        //constructor
    constructor(req?:any){
        if(req){
            this.id_etapa = req.body.id_etapa;
            this.tipo_id = req.body.tipo_id;
            this.etapa = req.body.etapa;
            this.orden = req.body.orden;           
      }

    }

}
