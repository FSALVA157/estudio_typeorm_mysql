import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import{IsInt, Min, Length, IsAlphanumeric, MinLength, IsEmail,  IsOptional, IsISO8601, Matches} from 'class-validator';
import {Transform} from 'class-transformer';

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
        unsigned: true
     })
    @IsInt({message:'La Categoria debe ser una clave entera'})
    categoria_id: number;
    
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
    @Length(10,100,{message:'El domicilio real debe tener entre $constraint1 y $constraint2 caracteres'})
    domicilio_real: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable:true
           })
    @IsOptional()
    @Length(10,100,{message:'El domicilio alternativo debe tener entre $constraint1 y $constraint2 caracteres'})
    domicilio_alternativo: string;

    @Column({
        type: "int",
        unsigned: true,
        nullable:true
     })
    @IsInt({message:'La provincia es una clave entera'})
    @IsOptional()
    provincia_id: number;

    @Column({
        type: "int",
        unsigned: true,
        nullable:true
     })
    @IsInt({message:'El departamento es una clave entera'})
    @IsOptional()
    departamento_id: number;

    @Column({
        type: "int",
        unsigned: true,
        nullable:true
     })
    @IsInt({message:'La localidad es una clave entera'})
    @IsOptional()
    localidad_id: number;

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
            this.provincia_id = req.body.provincia_id;
            this.departamento_id = req.body.departamento_id;
            this.localidad_id = req.body.localidad_id;
            this.telefono_celular = req.body.telefono_celular;
            this.telefono_alternativo = req.body.telefono_alternativo;
            this.ocupacion = req.body.ocupacion;
            this.email = req.body.email;
            this.fecha_alta = req.body.fecha_alta;
      }

    }

}
