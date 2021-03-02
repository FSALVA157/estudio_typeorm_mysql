import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, DeleteDateColumn} from "typeorm";
import{IsInt, Length,  IsOptional, IsISO8601, Matches, MinLength} from 'class-validator';
import {Transform} from 'class-transformer';
import { Fuero } from './Fuero';
import { Cliente } from './Cliente';
import { ObjetoExtrajudicial } from './ObjetoExtrajudicial';
import { RegistroContable } from './RegistroContable';
import { AlertaExtra } from './AlertaExtra';

@Entity()
export class CasoExtrajudicial {

    @PrimaryGeneratedColumn()
    id_caso_ext: number;

    @OneToMany(type => RegistroContable, asiento => asiento.caso_extrajudicial)
    asientos: RegistroContable[];

    @OneToMany(type => AlertaExtra, alertaEx => alertaEx.caso)
    alertasExtra: AlertaExtra[];

    @Column({
        type: "int",
       })
    @IsInt({message:'La clave de cliente debe ser un entero'})
    cliente_id: number;

    //relacion con tabla clientes
    @ManyToOne(type => Cliente,{eager : true})
    @JoinColumn({
        name : 'cliente_id',
        referencedColumnName : 'id_cliente'
    })
    cliente : Cliente;

    @Column({type: "date"})
    @IsISO8601()
    @Transform(()=>Date)
    fecha_tramite: Date;

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
        nullable: true
         })
    @IsOptional()
    @Length(2,30,{message:'El numero de expediente debe tener entre $constraint1 y $constraint2 caracteres'})
    expediente_nro: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
         })
    @IsOptional()
    @Length(2,100,{message:'El nombre de la contraparte debe tener entre $constraint1 y $constraint2 caracteres'})
    contraparte_nombre: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
         })
    @IsOptional()
    @Length(2,100,{message:'El apellido de la contraparte debe tener entre $constraint1 y $constraint2 caracteres'})
    contraparte_apellido: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
         })
    @IsOptional()
    @Length(2,100,{message:'La Razón Social de la contraparte debe tener entre $constraint1 y $constraint2 caracteres'})
    contraparte_razon_social: string;

    @Column({
        type: "varchar",
        length: 20,
        nullable:true
     })
     @IsOptional()
     @Length(7,20,{message:'El dni de la contraparte debe tener entre $constraint1 y $constraint2 caracteres'})
     contraparte_dni: string;

     @Column({
        type: "varchar",
        length: 100,
        nullable:true
           })
    @IsOptional()
    @Length(2,100,{message:'El domicilio  de la contraparte  debe tener entre $constraint1 y $constraint2 caracteres'})
    contraparte_domicilio: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
            })
    @IsOptional()
    @MinLength(7)
    contraparte_telefono: string;

    @Column({
        type: "varchar",
        length: 300,
        nullable: true
         })
    @IsOptional()
    @Length(5,100,{message:'Los datos del abogado deben tener entre $constraint1 y $constraint2 caracteres'})
    contraparte_abogado: string;

    @Column({
        type: "int",
        nullable:true
       })
    @IsOptional()
    @IsInt({message:'La materia debe ser un entero'})
    materia_id: number;

    //relacion con tabla fuero
    @ManyToOne(type => Fuero,{eager:true})
    @JoinColumn({
        name : 'materia_id',
        referencedColumnName: 'id_fuero'
    })
    materia : Fuero;

    @Column({
        type: "int",
        nullable:true
    })
    @IsOptional()
    @IsInt({message:'El objeto es una clave entera'})
    objeto_ext_id: number;

    @ManyToOne(type => ObjetoExtrajudicial,{eager : true})
    @JoinColumn({
        name : 'objeto_ext_id',
        referencedColumnName : 'id_objeto_ext'
    })
    objeto : ObjetoExtrajudicial;

    
    @Column({
        type: "varchar",
        length: 100,
        nullable: true
           })
    @Length(2,100,{message:'El mediador es un texto que debe tener entre $constraint1 y $constraint2 caracteres'})
    @IsOptional()
    mediador: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
           })
    @Length(2,100,{message:'El lugar de mediación es un texto que debe tener entre $constraint1 y $constraint2 caracteres'})
    @IsOptional()
    mediacion_domicilio: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
           })
    @Length(2,50,{message:'El telefono del mediador es un texto que debe tener entre $constraint1 y $constraint2 caracteres'})
    @IsOptional()
    mediador_telef: string;
    
    @Column({
        type: "datetime",
        nullable:true
    })
    @IsOptional()
    @IsISO8601()
    @Transform(()=>Date)
    fecha_audiencia: Date;

    @Column({
        default:true,
        nullable: true
     })
     @IsOptional()
     visible: boolean;

     @DeleteDateColumn()
     fecha_baja: Date;
  

    //constructor
    constructor(req?:any){
        if(req){
            this.cliente_id = req.body.cliente_id;
            this.fecha_tramite = req.body.fecha_tramite;
            this.detalle = req.body.detalle;
            this.expediente_nro = req.body.expediente_nro;
            this.contraparte_nombre = req.body.contraparte_nombre;
            this.contraparte_razon_social = req.body.contraparte_razon_social;
            this.contraparte_dni = req.body.contraparte_dni;
            this.contraparte_domicilio = req.body.contraparte_domicilio;
            this.contraparte_telefono = req.body.contraparte_telefono;
            this.materia_id = req.body.materia_id;
            this.objeto_ext_id = req.body.objeto_ext_id;
            this.mediador = req.body.mediador;
            this.mediacion_domicilio = req.body.mediacion_domicilio;
            this.mediador_telef = req.body.mediador_telef;
            this.fecha_audiencia = req.body.fecha_audiencia;
            this.visible = req.body.visible;
      }

    }

}
