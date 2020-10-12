import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import{IsOptional, Length} from 'class-validator';


@Entity()
export class TipoMovimiento {

    @PrimaryGeneratedColumn()
    id_tipo_mov: number;

    @Column({
        type: "varchar",
        length: 50,
            })
    @Length(2,50,{message:'El tipo de momviento debe tener entre $constraint1 y $constraint2 caracteres'})
    tipo_movimiento: string;

        //constructor
    constructor(req?:any){
        if(req){
            this.tipo_movimiento = req.body.tipo_movimiento;
           
      }

    }

}