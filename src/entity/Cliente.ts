import {Entity, PrimaryGeneratedColumn, Column,ManyToOne, JoinColumn} from "typeorm";
import{IsInt, Min, Length, IsAlphanumeric, MinLength, IsEmail,  IsOptional, IsISO8601, Matches} from 'class-validator';
import {Transform} from 'class-transformer';
import { CategoriaCliente } from './CategoriaCliente';

@Entity()
export class Cliente {
    
    @PrimaryGeneratedColumn()
    id_cliente: number;
    
    @Column({
        type: "int"
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
        length: 14
       
     })
    @Length(7,14,{message:'El cuit o cuit debe tener entre $constraint1 y $constraint2 caracteres'})
    cuit: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable:true
           })
    @IsOptional()
    @Length(5,100,{message:'El domicilio  debe tener entre $constraint1 y $constraint2 caracteres'})
    domicilio_cliente: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
           })
   @Length(3,50,{message:'La provincia debe tener entre $constraint1 y $constraint2 caracteres'})
   @IsOptional()
    provincia_cliente: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
           })
   @Length(3,50,{message:'El departamento debe tener entre $constraint1 y $constraint2 caracteres'})
   @IsOptional()
    departamento_cliente: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
           })
   @Length(3,50,{message:'La localidad debe tener entre $constraint1 y $constraint2 caracteres'})
   @IsOptional()
    localidad_cliente: string;

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
       length: 14
       
    })
    @Length(7,14,{message:'El dni o cuit debe tener entre $constraint1 y $constraint2 caracteres'})
    dni: string;
    
    @Column({
        type: "varchar",
        length: 50
        
           })
    @IsEmail()
    email: string;
    
    @Column({
        type: "varchar",
        length: 50,
        nullable: true
           })
    @Length(3,50,{message:'La provincia debe tener entre $constraint1 y $constraint2 caracteres'})
    @IsOptional()
    provincia_representante: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
           })
    @Length(3,50,{message:'El departamento debe tener entre $constraint1 y $constraint2 caracteres'})
    @IsOptional()
    departamento_representante: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
           })
    @Length(3,50,{message:'La localidad debe tener entre $constraint1 y $constraint2 caracteres'})
    @IsOptional()
    localidad_representante: string;
    
    @Column({
        type: "varchar",
        length: 100,
        nullable:true
           })
    @IsOptional()
    @Length(5,100,{message:'El domicilio alternativo debe tener entre $constraint1 y $constraint2 caracteres'})
    domicilio_representante: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
            })
    @IsOptional()
    @MinLength(7)
    telefono: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable:true
           })
    @IsOptional()
    @MinLength(7)
    telefono_alt: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable:true
           })
    @IsOptional()
    @Length(5,200,{message:'el contacto alternativo debe tener entre $constraint1 y $constraint2 caracteres'})
    contacto_alt: string;
   
   @Column({
       type: "date",
       nullable:true
    })
   @IsOptional()
   @IsISO8601()
   @Matches(/^\d{4}([\-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,{message:'El dato debe respetar el formato yyyy-mm-dd'})
   @Transform(()=>Date)
   fecha_alta: Date;

   @Column({default:true })
   visible: boolean;

       //constructor
    constructor(req?:any){
        if(req){
            this.cuit = req.body.cuit;
            this.domicilio_cliente = req.body.domicilio_cliente;
            this.categoria_id = req.body.categoria_id;
            this.razon_social = req.body.razon_social;
            this.provincia_cliente = req.body.provincia_cliente;
            this.departamento_cliente = req.body.departamento_cliente;
            this.localidad_cliente = req.body.localidad_cliente;
            this.nombre = req.body.nombre;
            this.apellido = req.body.apellido;
            this.dni = req.body.dni;
            this.email = req.body.email;
            this.provincia_representante = req.body.provincia_representante;
            this.departamento_representante = req.body.departamento_representante;
            this.localidad_representante = req.body.localidad_representante;
            this.domicilio_representante = req.body.domicilio_representante;
            this.telefono = req.body.telefono;
            this.contacto_alt = req.body.contacto_alt;
            this.telefono_alt = req.body.telefono_alt;
            this.fecha_alta = req.body.fecha_alta;
            this.visible = req.body.visible;
      }

    }

}
