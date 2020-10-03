import {Entity, PrimaryGeneratedColumn, Column,} from "typeorm";
import{IsInt, Length,  IsOptional, IsISO8601, Matches} from 'class-validator';
import {Transform} from 'class-transformer';
import { CategoriaCliente } from './CategoriaCliente';

@Entity()
export class Caso {

    @PrimaryGeneratedColumn()
    id_caso: number;

    @Column({
        type: "int",
       })
    @IsInt({message:'La clave de cliente debe ser un entero'})
    cliente_id: number;

    @Column({type: "date"})
    @IsISO8601()
    @Matches(/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,{message:'La fecha   debe respetar el formato yyyy-mm-dd'})
    @Transform(()=>Date)
    fecha_inicio: Date;

    @Column({
        type: "varchar",
        length: 500,
        nullable: true
         })
    @IsOptional()
    @Length(5,500,{message:'El detalle debe tener entre $constraint1 y $constraint2 caracteres'})
    detalle: string;

    @Column({
        type: "varchar",
        length: 30,
        nullable: true,
        unique:true
         })
    @IsOptional()
    @Length(5,30,{message:'El numero de expediente debe tener entre $constraint1 y $constraint2 caracteres'})
    expediente_nro: string;

    @Column({
        type: "varchar",
        length: 500,
        nullable: true
         })
    @IsOptional()
    @Length(5,500,{message:'El nombre de la otra parte debe tener entre $constraint1 y $constraint2 caracteres'})
    contraparte_datos: string;

    @Column({
        type: "int",
        nullable:true,
        default:1
       })
    @IsOptional()
    @IsInt({message:'La clave jurisdiccion debe ser un entero'})
    jurisdiccion_id: number;

    @Column({
        type: "int",
        nullable:true
       })
    @IsOptional()
    @IsInt({message:'El distrito debe ser un entero'})
    distrito_id: number;

    @Column({
        type: "int",
        nullable:true
       })
    @IsOptional()
    @IsInt({message:'El fuero debe ser un entero'})
    fuero_id: number;

    @Column({
        type: "int",
        nullable:true
       })
    @IsOptional()
    @IsInt({message:'El juzgado debe ser un entero'})
    juzgado_id: number;

    @Column({
        type: "int",
       })
    @IsInt({message:'La clave de carácter del letrado debe ser un entero'})
    caracter_letrado_id: number;

    @Column({
        type: "int",
       })
    @IsInt({message:'La clave de carácter del cliente debe ser un entero'})
    caracter_cliente_id: number;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
           })
   @Length(10,100,{message:'La caratula debe tener entre $constraint1 y $constraint2 caracteres'})
   @IsOptional()
    mesa: string;

    @Column({
        type: "int",
        nullable:true
    })
    @IsOptional()
    @IsInt({message:'El objeto es una clave entera'})
    objeto_id: number;

    @Column({
        type: "int",
        nullable:true
    })
    @IsOptional()
    @IsInt({message:'La instancia debe ser un entero'})
    instancia_id: number;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
           })
   @Length(10,50,{message:'La caratula debe tener entre $constraint1 y $constraint2 caracteres'})
   @IsOptional()
   caratula: string;

   @Column({default:true })
   estado: boolean;

   @Column({
    type: "int",
    nullable:true
    })
    @IsOptional()
    @IsInt({message:'La etapa debe ser un entero'})
    etapa: number;
    
    @Column({
        type: "date",
        nullable:true
    })
    @IsOptional()
    @IsISO8601()
    @Matches(/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,{message:'La fecha   debe respetar el formato yyyy-mm-dd'})
    @Transform(()=>Date)
    fecha_fin: Date;

  

    //constructor
    constructor(req?:any){
        if(req){
            this.cliente_id = req.body.cliente_id;
            this.fecha_inicio = req.body.fecha_inicio;
            this.detalle = req.body.detalle;
            this.expediente_nro = req.body.expediente_nro;
            this.contraparte_datos = req.body.contraparte_datos;
            this.jurisdiccion_id = req.body.jurisdiccion_id;
            this.distrito_id = req.body.distrito_id;
            this.fuero_id = req.body.fuero_id;
            this.juzgado_id = req.body.juzgado_id;
            this.caracter_letrado_id = req.body.caracter_letrado_id;
            this.caracter_cliente_id = req.body.caracter_cliente_id;
            this.mesa = req.body.mesa;
            this.objeto_id = req.body.objeto_id;
            this.instancia_id = req.body.instancia_id;
            this.caratula = req.body.caratula;
            this.estado = req.body.estado;
            this.etapa = req.body.estapa;
      }

    }

}
