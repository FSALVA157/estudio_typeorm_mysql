import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { Caso } from './Caso';
import{IsInt, IsISO8601, IsOptional, Length, Matches} from 'class-validator';


@Entity()
export class Alerta {

    @PrimaryGeneratedColumn()
    id_alerta: number;

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
        nullable:true
            })
    @IsOptional()
    @Length(2,100,{message:'El juzgado debe tener entre $constraint1 y $constraint2 caracteres'})
    juzgado: string;

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
    caso_id: number;

     //relacion con tabla caso
     @ManyToOne(type => Caso,{eager : true})
     @JoinColumn({
         name : 'caso_id',
         referencedColumnName : 'id_caso'
     })
     caso : Caso;

     @Column({
        default:true,
        nullable: true
     })
     @IsOptional()
     visible: boolean;

    

    //constructor
    constructor(req?:any){
        if(req){
            this.fecha = req.body.fecha;
            this.detalle = req.body.detalle;
            this.juzgado = req.body.juzgado;
            this.estado = req.body.estado;
            this.caso_id = req.body.caso_id;
            this.visible = req.body.visible;
      }

    }

}
