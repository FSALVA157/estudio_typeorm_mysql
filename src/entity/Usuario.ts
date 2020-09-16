import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { UsuarioController } from '../controller/UsuarioController';
import{IsInt, Min, IsAlpha, Length, isInt, IsAlphanumeric, MinLength, IsEmail, IsBoolean, IsDate,} from 'class-validator';

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
           })
    @Length(10,100,{message:'El domicilio debe tener entre $constraint1 y $constraint2 caracteres en este momento tu texto tiene una longitud de $value letras'})
    domicilio_procesal: string;

    @Column({
        type: "varchar",
        length: 30,
        nullable:true
           })
    @IsAlphanumeric()
    @MinLength(4)
    matricula: string;

    @Column({
        type: "varchar",
        length: 50,
        unique: true
           })
    
    usuario: string;
    @Length(4,50,{message:'El usuario debe tener entre $constraint1 y $constraint2 caracteres en este momento tu texto tiene una longitud de $value letras'})
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

    @Column({type: "date",nullable:false})
   
    fecha_alta: Date;

    @Column({type: "date"})
   
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
