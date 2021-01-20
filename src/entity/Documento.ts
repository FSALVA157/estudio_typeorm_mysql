import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import{IsInt, IsISO8601, IsOptional, Length} from 'class-validator';
import {Transform} from 'class-transformer';
import { Caso } from './Caso';

@Entity()
export class Documento{
    
    @PrimaryGeneratedColumn()
    id_documento: number;

    @Column({
        type: "int"
         })
    @IsInt({message:'la clave del caso es un entero'})
    caso_id: number;

    @ManyToOne(type => Caso,  {eager:true})
    @JoinColumn({
        name: 'caso_id',
        referencedColumnName: 'id_caso'
    })
    caso: Caso;

    @Column({type: "date"})
    @IsISO8601()
    @Transform(()=>Date)
    fecha: Date;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
         })
    @IsOptional()
    @Length(0,100,{message:'El titulo no puede superar los 100 caracteres'})
    titulo: string;

    @Column({
        type: "varchar",
        length: 500,
        nullable: true
         })
    @IsOptional()
    @Length(0,500,{message:'El detalle debe tener entre $constraint1 y $constraint2 caracteres'})
    detalle: string;

    @Column({
        type: "varchar",
        length: 100,
         })
    @Length(5,100,{message:'la url no puede ser nula ni menor a 5 caracteres'})
    url: string;


    @Column({
        type: "int",
        nullable: true
    })
    @IsOptional()
    @IsInt({message:'El folio indica el orden al paginar y es un entero'})
    folio: number;

    @Column({
        type: "int",
        nullable: true
       })
    @IsOptional()
    @IsInt({message:'La clave de usuario debe ser un entero'})
    usuario_id: number;

            
    //constructor
    constructor(req?:any){
        if(req){
            this.caso_id = req.body.caso_id;
            this.fecha = req.body.fecha;
            this.titulo = req.body.titulo;
            this.detalle = req.body.detalle;
            this.url = req.body.url;
            this.folio = req.body.folio;
            this.usuario_id = req.body.usuario_id;
           
      }
    }
}
