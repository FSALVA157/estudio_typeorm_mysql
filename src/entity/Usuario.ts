import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import{IsInt, Min, Length, IsAlphanumeric, MinLength, IsEmail, IsOptional, IsISO8601, Matches} from 'class-validator';
import {Transform} from 'class-transformer';

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column({type: "int",unsigned: true })
    @IsInt({message:'El dni debe ser un número entero'})
    @Min(1000000,{message:'El valor que intenta asignar a Dni no es válido'})
    dni_usuario: number;

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
   @Length(4,50,{message:'El apellido debe tener entre $constraint1 y $constraint2 caracteres en este momento tu texto tiene una longitud de $value letras'})
    apellido: string;

    @Column({type: "int",unsigned: true })
    @IsInt({message:'El tipo debe ser una clave entera'})
    tipo_id: number;

    @Column({
        type: "varchar",
        length: 100,
        nullable:true
           })
    @IsOptional()
    @Length(10,100,{message:'El domicilio debe tener entre $constraint1 y $constraint2 caracteres en este momento tu texto tiene una longitud de $value letras'})
    domicilio_procesal: string;

    @Column({
        type: "varchar",
        length: 30,
        nullable:true
           })
    @IsOptional()
    @IsAlphanumeric()
    @MinLength(4)
    matricula: string;

    @Column({
        type: "varchar",
        length: 50,
        unique: true
           })
    @Length(4,50,{message:'El usuario debe tener entre $constraint1 y $constraint2 caracteres en este momento tu texto tiene una longitud de $value letras'})
    usuario: string;

    @Column({
        type: "varchar",
        length: 50,
        unique: true
           })
    password: string;

    @Column({type: "int",unsigned: true })
    @IsInt({message:'El estudio debe ser una clave entera'})
    estudio_id: number;

    @Column({
        type: "varchar",
        length: 50,
        unique: true
           })
    @IsEmail()
    email: string;

    @Column({type: "int",unsigned: true })
    @IsInt({message:'El nivel debe ser una clave entera'})
    nivel_usuario_id: number;

    @Column({default:true })
   estado: boolean;

   @Column({type: "date"})
   @IsISO8601()
   @Matches(/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,{message:'El dato debe respetar el formato yyyy/mm/dd'})
   @Transform(()=>Date)
   fecha_alta: Date;

    @Column({type: "date",nullable:true})
    @IsOptional()
    @IsISO8601()
    @Matches(/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,{message:'El dato debe respetar el formato yyyy/mm/dd'})
    @Transform(()=>Date)
    fecha_baja: Date;


    //constructor
    constructor(req?:any){
        if(req){
            this.dni_usuario = req.body.dni_usuario;
            this.nombre = req.body.nombre;
            this.apellido = req.body.apellido;
            this.tipo_id = req.body.tipo_id;
            this.domicilio_procesal = req.body.domicilio_procesal;
            this.matricula = req.body.matricula;
            this.usuario = req.body.usuario;
            this.password = req.body.password;
            this.estudio_id = req.body.estudio_id;
            this.email = req.body.email;
            this.nivel_usuario_id = req.body.nivel_usuario_id;
            this.fecha_alta = req.body.fecha_alta;
            this.fecha_baja = req.body.fecha_baja;
        }

    }

}
