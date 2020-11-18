import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Caso } from './Caso';
import { Transform } from 'class-transformer';
import {IsDecimal, IsEnum, IsInt, IsISO8601, IsOptional, Length, Matches} from 'class-validator';
import { CasoExtrajudicial } from './CasoExtrajudicial';
import config from '../config/config';

export enum TipoTransaccion{
    ENTRADA = 'cargo',
    SALIDA = 'abono'
};

@Entity()
export class RegistroContable {

    @PrimaryGeneratedColumn()
    id_registro: number;

    @Column({
        type: "int",
        nullable:true
       })
    @IsOptional()
    @IsInt({message:'La clave de caso debe ser un entero'})
    caso_id: number;

    //relacion con tabla clientes
    @ManyToOne(type => Caso,{eager : true})
    @JoinColumn({
        name : 'caso_id',
        referencedColumnName : 'id_caso'
    })
    caso : Caso;

     @Column({
         type: "int",
        nullable:true
       })
    @IsOptional()
    @IsInt({message:'La clave de caso extrajudicial debe ser un entero'})
    caso_id_ext: number;

    @ManyToOne(type => CasoExtrajudicial,{eager: true})
    @JoinColumn({
        name: 'caso_id_ext',
        referencedColumnName: 'id_caso_ext'
    })
    caso_extrajudicial: CasoExtrajudicial;

    @Column({
        type: "enum",
        enum: TipoTransaccion,
        nullable: false
    })
    @IsEnum(TipoTransaccion)
    tipo_registro: TipoTransaccion;

    @Column({
        type: "decimal",
        precision: 11,
        scale: 2,
        default: 0,
        nullable: false
    })
    @IsDecimal()
    monto: number;

    @Column({type: "date"})
    @IsISO8601()
    @Transform(()=>Date)
    fecha: Date;

    @Column({
        type: "varchar",
        length: 500,
        nullable: false
         })
    @Length(5,500,{message:'El detalle debe tener entre $constraint1 y $constraint2 caracteres'})
    detalle: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
         })
    @IsOptional()
    @Length(5,50,{message:'El recibo debe tener entre $constraint1 y $constraint2 caracteres'})
    recibo: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
         })
    @IsOptional()
    @Length(2,50,{message:'El tipo de cargo debe tener entre $constraint1 y $constraint2 caracteres'})
    tipo_cargo: string;

    
        

    //constructor
    constructor(req?:any){
        if(req){
            this.caso_id = req.body.caso_id;
            this.caso_id_ext = req.body.caso_id_ext;
            this.tipo_registro = req.body.tipo_registro;
            this.monto = req.body.monto;
            this.fecha = req.body.fecha;
            this.detalle = req.body.detalle;
            this.recibo = req.body.recibo;
            this.tipo_cargo = req.body.tipo_cargo;
      }

    }

}