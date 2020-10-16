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

    @Column("simple-array")
    etapas: string[];

    @Column("simple-json")
    secuencia: { etapas: string[]};

        //constructor
    constructor(req?:any){
        if(req){
            this.tipo_proceso = req.body.tipo_proceso;
            this.etapas = req.body.etapas;
            this.secuencia = req.body.secuencia;           
      }

    }

}
