import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { Caso } from './Caso';
import { CasoExtrajudicial } from './CasoExtrajudicial';
import{IsInt, IsISO8601, IsOptional, Length, Matches} from 'class-validator';


@Entity()
export class AlertaExtra {

    @PrimaryGeneratedColumn()
    id_alerta_extra: number;

    @Column({type: "datetime"})
    @IsISO8601()
    //@Matches(/^\d{4}([\-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,{message:'La fecha   debe respetar el formato yyyy-mm-dd'})
    //@Transform(()=>Date)
    fecha: Date;

    @Column({
        type: "varchar",
        length: 500,
            })
    @Length(2,500,{message:'El detalle de la alerta debe tener entre $constraint1 y $constraint2 caracteres'})
    detalle: string;
    
    @Column({
        type: "varchar",
        length: 100,
            })
    @Length(2,100,{message:'El lugar de la alerta debe tener entre $constraint1 y $constraint2 caracteres'})
    lugar: string;

    @Column({
        default:true,
        nullable:true
     })
    @IsOptional()
    estado: boolean;

    @Column({
        type: "int",
             })
    @IsInt({message:'La clave de enlace con CASO debe ser un entero'})
    caso_extra_id: number;

     //relacion con tabla caso
     @ManyToOne(type => CasoExtrajudicial,{eager : true})
     @JoinColumn({
         name : 'caso_extra_id',
         referencedColumnName : 'id_caso_ext'
     })
     caso : Caso;

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
            this.fecha = req.body.fecha;
            this.detalle = req.body.detalle;
            this.estado = req.body.estado;
            this.caso_extra_id = req.body.caso_extra_id;
            this.visible = req.body.visible;
      }

    }

}
