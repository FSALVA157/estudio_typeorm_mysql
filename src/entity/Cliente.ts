import {Entity, PrimaryGeneratedColumn, Column,ManyToOne, JoinColumn} from "typeorm";
import{IsInt, Min, Length, IsAlphanumeric, MinLength, IsEmail,  IsOptional, IsISO8601, Matches} from 'class-validator';
import {Transform} from 'class-transformer';
import { CategoriaCliente } from './CategoriaCliente';

@Entity()
export class Cliente {

    @PrimaryGeneratedColumn()
    id_cliente: number;

    @Column({
        type: "varchar",
        length: 14,
        unique:true
     })
    @Length(7,14,{message:'El dni o cuit debe tener entre $constraint1 y $constraint2 caracteres'})
    dni_cuit: string;

    @Column({
        type: "int",
       })
    @IsInt({message:'La Categoria debe ser una clave entera'})
    categoria_id: number;

    @ManyToOne(type => CategoriaCliente,{eager:true})
    @JoinColumn({
        name: 'categoria_id',
        referencedColumnName: 'id_categoria_cli'
    })
    cliente_categoria: CategoriaCliente;
    
    @Column({
        type: "varchar",
        length: 100,
        nullable: true
           })
   @Length(10,50,{message:'La razón social debe tener entre $constraint1 y $constraint2 caracteres'})
   @IsOptional()
   razon_social: string;

   @Column({
        type: "varchar",
        length: 50,
         })
   @Length(4,50,{message:'El nombre debe tener entre $constraint1 y $constraint2 caracteres'})
   nombre: string;

   @Column({
        type: "varchar",
        length: 50,
            })
   @Length(4,50,{message:'El apellido debe tener entre $constraint1 y $constraint2 caracteres'})
   apellido: string;

    @Column({
        type: "varchar",
        length: 100,
         })
    @Length(5,100,{message:'El domicilio real debe tener entre $constraint1 y $constraint2 caracteres'})
    domicilio_real: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable:true
           })
    @IsOptional()
    @Length(5,100,{message:'El domicilio alternativo debe tener entre $constraint1 y $constraint2 caracteres'})
    domicilio_alternativo: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
           })
   @Length(3,50,{message:'La razón social debe tener entre $constraint1 y $constraint2 caracteres'})
   @IsOptional()
    provincia: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
           })
   @Length(3,50,{message:'La razón social debe tener entre $constraint1 y $constraint2 caracteres'})
   @IsOptional()
    departamento: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
           })
   @Length(3,50,{message:'La razón social debe tener entre $constraint1 y $constraint2 caracteres'})
   @IsOptional()
    localidad: string;

    @Column({
        type: "varchar",
        length: 50,
            })
    @IsAlphanumeric()
    @MinLength(9)
    telefono_celular: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable:true
           })
    @IsOptional()
    @MinLength(7)
    telefono_alternativo: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable:true
           })
    @IsOptional()
    @Length(5,50,{message:'la ocupación debe tener entre $constraint1 y $constraint2 caracteres en este momento'})
    ocupacion: string;

    @Column({
        type: "varchar",
        length: 50,
        unique: true
           })
    @IsEmail()
    email: string;

    
   @Column({type: "date"})
   @IsISO8601()
   @Matches(/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,{message:'El dato debe respetar el formato yyyy-mm-dd'})
   @Transform(()=>Date)
   fecha_alta: Date;

    

    //constructor
    constructor(req?:any){
        if(req){
            this.dni_cuit = req.body.dni_cuit;
            this.categoria_id = req.body.categoria_id;
            this.razon_social = req.body.razon_social;
            this.nombre = req.body.nombre;
            this.apellido = req.body.apellido;
            this.domicilio_real = req.body.domicilio_real;
            this.domicilio_alternativo = req.body.domicilio_alternativo;
            this.provincia = req.body.provincia_id;
            this.departamento = req.body.departamento_id;
            this.localidad = req.body.localidad_id;
            this.telefono_celular = req.body.telefono_celular;
            this.telefono_alternativo = req.body.telefono_alternativo;
            this.ocupacion = req.body.ocupacion;
            this.email = req.body.email;
            this.fecha_alta = req.body.fecha_alta;
      }

    }

}
