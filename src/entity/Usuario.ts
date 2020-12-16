import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne, JoinColumn, DeleteDateColumn} from "typeorm";
import{IsInt, Min, Length, IsAlphanumeric, MinLength, IsEmail, IsOptional, IsISO8601, Matches, IsEnum} from 'class-validator';
import {Exclude, Transform} from 'class-transformer';
import { EncryptionTransformer } from "typeorm-encrypted";
import { TipoUsuario } from './TipoUsuario';

enum UserRole{
    ADMIN = 'admin',
    NORMAL = 'normal'
};

@Entity()
export class  Usuario {

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

    @Column({
        type: "int",
        nullable: true
     })
    @IsOptional()
    @IsInt({message:'El tipo debe ser una clave entera'})
    tipo_id: number;

    @ManyToOne(type => TipoUsuario,{eager:true})
    @JoinColumn({
        name: 'tipo_id',
        referencedColumnName: 'id_tipo_usuario'
    })
    tipoDeUsuario: TipoUsuario;


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
        nullable:false,
        //unique: true
        transformer: new EncryptionTransformer({
            key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
            algorithm: 'aes-256-cbc',
            ivLength: 16,
            iv: 'ff5ac19190424b1d88f9419ef949ae56'
          })
          //select:false //ocultar la columna
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

    // @Column({type: "int",unsigned: true })
    // @IsInt({message:'El nivel debe ser una clave entera'})
    // nivel_usuario_id: number;
    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.NORMAL,
        nullable: false
    })
    @IsEnum(UserRole)
    role: UserRole;
    

    @Column({default:true })
    estado: boolean;
    
    @Column({type: "date"})
    @IsISO8601()
    @Transform(()=>Date)
    fecha_alta: Date;
    
    // @Column({type: "date",nullable:true})
    // @IsOptional()
    // @IsISO8601()
    // @Transform(()=>Date)
    // fecha_baja: Date;

    @DeleteDateColumn()
    fecha_baja: Date;

    verificarPassword(pass: string): boolean{
        return this.password == pass;
    }


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
            this.role = req.body.rol;
            this.fecha_alta = req.body.fecha_alta;
            this.fecha_baja = req.body.fecha_baja;
        }

    }

}
