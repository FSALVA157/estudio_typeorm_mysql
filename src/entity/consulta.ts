import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { Cliente } from './Cliente';
import{IsInt, IsISO8601, IsOptional, Length, Matches} from 'class-validator';


@Entity()
export class Consulta {

    @PrimaryGeneratedColumn()
    id_consulta: number;

    @Column({
        type: "int",
        nullable: false
       })
    @IsInt({message:'La clave de caso debe ser un entero'})
    cliente_id: number;

    //relacion con tabla clientes
    @ManyToOne(type => Cliente,{eager : true})
    @JoinColumn({
        name : 'cliente_id',
        referencedColumnName : 'id_cliente'
    })
    cliente : Cliente;

    @Column({
        type: "date",
        nullable: false
    })
    @IsISO8601()
    @Transform(()=>Date)
    fecha: Date;

    @Column({
        type: "varchar",
        length: 500,
        nullable: false
         })
    @IsOptional()
    @Length(5,500,{message:'El detalle debe tener entre $constraint1 y $constraint2 caracteres'})
    detalle: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
         })
    @IsOptional()
    @Length(5,100,{message:'Una observación debe tener entre $constraint1 y $constraint2 caracteres'})
    obs: string;

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
            this.fecha = req.body.fecha;
            this.detalle = req.body.detalle;
            this.obs = req.body.obs;
            this.visible = req.body.visible;
      }

    }

}