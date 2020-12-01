import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { IsOptional, Length } from 'class-validator';
import { Objeto } from './Objeto';



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

    @OneToMany(type => Objeto, objeto => objeto.tipo_de_proceso)
    objetos: Objeto[]

    @Column({
      type: "simple-array",
      nullable: true
    })
    @IsOptional()
    etapas: string[];

    @Column({
        type: "simple-json",
        nullable: true
    })
    @IsOptional()
    secuencia: { etapas: string[]};

    @Column({
        type: "varchar",
        nullable: true
     })
     @IsOptional()
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
