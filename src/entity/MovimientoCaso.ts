import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Caso } from './Caso';
import { Transform } from 'class-transformer';
import { TipoMovimiento } from './TipoMovimiento';
import{IsInt, IsISO8601, IsOptional, Length, Matches} from 'class-validator';


@Entity()
export class MovimientoCaso {

    @PrimaryGeneratedColumn()
    id_mov_caso: number;

    @Column({
        type: "int",
       })
    @IsInt({message:'La clave de caso debe ser un entero'})
    caso_id: number;

    //relacion con tabla clientes
    @ManyToOne(type => Caso,{eager : true})
    @JoinColumn({
        name : 'caso_id',
        referencedColumnName : 'id_caso'
    })
    caso : Caso;

    @Column({type: "date"})
    @IsISO8601()
    @Transform(()=>Date)
    fecha: Date;

    @Column({
        type: "varchar",
        length: 500,
        nullable: true
         })
    @IsOptional()
    @Length(5,500,{message:'El detalle debe tener entre $constraint1 y $constraint2 caracteres'})
    detalle: string;

    @Column({
        type: "int",
       })
    @IsInt({message:'El tipo de movimiento es un entero'})
    tipo_mov_id: number;

    //relacion con tabla clientes
    @ManyToOne(type => TipoMovimiento,{eager : true})
    @JoinColumn({
        name : 'tipo_mov_id',
        referencedColumnName : 'id_tipo_mov'
    })
    tipo : TipoMovimiento;

    @Column({
        type: "varchar",
        length: 100,
    })
    @Length(3,100,{message:'La etapa debe tener entre $constraint1 y $constraint2 caracteres'})
    etapa: string;

    // @Column({
    //     default:true,
    //     nullable: true
    //  })
    //  @IsOptional()
    //  visible: boolean;

     @DeleteDateColumn()
    fecha_baja: Date;
        

    //constructor
    constructor(req?:any){
        if(req){
            this.caso_id = req.body.caso_id;
            this.detalle = req.body.detalle;
            this.fecha = req.body.fecha;
            this.tipo_mov_id = req.body.tipo_mov_id;
            this.etapa = req.body.etapa;
      }

    }

}