import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import{IsInt, IsOptional, Length} from 'class-validator';


@Entity()
export class TipoProceso {

    @PrimaryGeneratedColumn()
    id_tipo_proceso: number;

    @Column({
        type: "varchar",
        length: 50,
        unique:true
     })
    @Length(3,50,{message:'El tipo de proceso debe tener entre $constraint1 y $constraint2 caracteres'})
    tipo_proceso: string;

    @Column({
      type: "simple-array"
    })
    etapas: string[];

    @Column({
        type: "simple-json"
    })
    secuencia: { etapas: string[]};

    @Column({
        type: "varchar",
        length: 50
        
     })
    @Length(3,50,{message:'Este campo entre $constraint1 y $constraint2 caracteres'})
    campo: string;

        //constructor
    constructor(req?:any){
        if(req){
            this.id_tipo_proceso = req.body.id_tipo_proceso;
            this.tipo_proceso = req.body.tipo_proceso;
            this.etapas = req.body.etapas;
            this.secuencia = req.body.secuencia;           
      }

    }

}
