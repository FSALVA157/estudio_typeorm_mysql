import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, AfterLoad, getRepository, DeleteDateColumn } from 'typeorm';
import{IsInt, Length,  IsOptional, IsISO8601, IsDecimal, MinLength} from 'class-validator';
import {Transform} from 'class-transformer';
import { Jurisdiccion } from './Jurisdiccion';
import { Distrito } from './Distrito';
import { Fuero } from './Fuero';
import { Juzgado } from './Juzgado';
import { Objeto } from './Objeto';
import { Cliente } from './Cliente';
import { TipoProceso } from './TipoProceso';
import { EstadoCaso } from './EstadoCaso';
import { Instancia } from './Instancia';
import { MovimientoCaso } from './MovimientoCaso';
import { Alerta } from './Alerta';
import { RegistroContable } from './RegistroContable';


@Entity()
export class Caso {

    @PrimaryGeneratedColumn()
    id_caso: number;

    @OneToMany(type => MovimientoCaso,movimiento => movimiento.caso,{onDelete: "CASCADE",cascade: true})
    movimientos : MovimientoCaso[];

    
    @Column({
        type: "simple-array",
        nullable: true
    })
    @IsOptional()
    etapas: string[];
    
    @AfterLoad()
    misEtapas(){
        let arreglo: string[] = [];
        if(this.movimientos != undefined){
            this.movimientos.forEach(element => {
                if(!arreglo.includes(element.etapa)){
                    arreglo.push(element.etapa);
                }
                this.etapas = arreglo;
                
            });

        }else{
            this.etapas = [];
        }
        
    }

    @OneToMany(type => Alerta,alerta => alerta.caso,{onDelete: "CASCADE",cascade: true})
    alertas : Alerta[];

    @OneToMany(type => RegistroContable,asiento => asiento.caso,{onDelete: "CASCADE",cascade: true})
    asientos: RegistroContable[];

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
    fecha_inicio: Date;

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
        nullable: true,
        unique:true
         })
    @IsOptional()
    @Length(5,30,{message:'El numero de expediente debe tener entre $constraint1 y $constraint2 caracteres'})
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
    @Length(2,100,{message:'El domicilio real de la contraparte  debe tener entre $constraint1 y $constraint2 caracteres'})
    contraparte_dom_real: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable:true
           })
    @IsOptional()
    @Length(2,100,{message:'El domicilio procesal de la contraparte  debe tener entre $constraint1 y $constraint2 caracteres'})
    contraparte_dom_proc: string;

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
        nullable:true,
        default:1
       })
    @IsOptional()
    @IsInt({message:'La clave jurisdiccion debe ser un entero'})
    jurisdiccion_id: number;

   // relacion con tabla jurisdiccion
    @ManyToOne(type => Jurisdiccion,{eager:true})
    @JoinColumn({
        name: 'jurisdiccion_id',
        referencedColumnName: 'id_jurisdiccion'
    })
    jurisdiccion: Jurisdiccion;

    @Column({
        type: "int",
        nullable:true
       })
    @IsOptional()
    @IsInt({message:'El distrito debe ser un entero'})
    distrito_id: number;

    //relacion con tabla distrito
    @ManyToOne(type => Distrito,{eager:true})
    @JoinColumn({
        name: 'distrito_id',
        referencedColumnName: 'id_distrito'
    })
    distrito : Distrito;

    @Column({
        type: "int",
        nullable:true
       })
    @IsOptional()
    @IsInt({message:'El fuero debe ser un entero'})
    fuero_id: number;

    //relacion con tabla fuero
    @ManyToOne(type => Fuero,{eager:true})
    @JoinColumn({
        name : 'fuero_id',
        referencedColumnName: 'id_fuero'
    })
    fuero : Fuero;

    @Column({
        type: "int",
        nullable:true
       })
    @IsOptional()
    @IsInt({message:'El juzgado debe ser un entero'})
    juzgado_id: number;

    @ManyToOne(type => Juzgado,{eager:true})
    @JoinColumn({
        name : 'juzgado_id',
        referencedColumnName : 'id_juzgado'
    })
    juzgado : Juzgado;


    @Column({
        type: "int",
       })
    @IsInt({message:'La clave de carácter del letrado debe ser un entero'})
    caracter_letrado_id: number;

    @Column({
        type: "int",
       })
    @IsInt({message:'La clave de carácter del cliente debe ser un entero'})
    caracter_cliente_id: number;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
           })
   @Length(10,100,{message:'La caratula debe tener entre $constraint1 y $constraint2 caracteres'})
   @IsOptional()
    mesa: string;

    @Column({
        type: "int",
        nullable:true
    })
    @IsOptional()
    @IsInt({message:'El objeto es una clave entera'})
    objeto_id: number;

    @ManyToOne(type => Objeto,{eager : true})
    @JoinColumn({
        name : 'objeto_id',
        referencedColumnName : 'id_objeto'
    })
    objeto : Objeto;

    @Column({
        type: "int",
        nullable:true
    })
    @IsOptional()
    @IsInt({message:'El tipo de proceso es una clave entera'})
    tipo_proceso_id: number;

    @ManyToOne(type => TipoProceso,{eager : true})
    @JoinColumn({
        name : 'tipo_proceso_id',
        referencedColumnName : 'id_tipo_proceso'
    })
    tipo : TipoProceso;


    @Column({
        type: "int",
        nullable:true
    })
    @IsOptional()
    @IsInt({message:'La instancia debe ser un entero'})
    instancia_id: number;

    @ManyToOne(type => Instancia,{eager : true})
    @JoinColumn({
    name : 'instancia_id',
    referencedColumnName : 'id_instancia'
    })
    instancia : Instancia;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
           })
   @Length(10,100,{message:'La caratula debe tener entre $constraint1 y $constraint2 caracteres'})
   @IsOptional()
   caratula: string;

   @Column({
    type: "int",
    default: 1,
    nullable:true
    })
    @IsOptional()
    @IsInt({message:'El estado del caso es una clave entera'})
    estado_id: number;
    
    @ManyToOne(type => EstadoCaso,{eager : true})
    @JoinColumn({
    name : 'estado_id',
    referencedColumnName : 'id_estado'
    })
    estado : EstadoCaso;
    

   @Column({
    type: "int",
    nullable:true
    })
    @IsOptional()
    @IsInt({message:'La etapa debe ser un entero'})
    etapa: number;

    @Column({
        type: "decimal",
        precision: 14,
        scale: 2,
        default: 0,
        nullable: true
    })
    @IsOptional()
    @IsDecimal()
    monto_juicio: number;
    
    @Column({
        type: "date",
        nullable:true
    })
    @IsOptional()
    @IsISO8601()
    @Transform(()=>Date)
    fecha_fin: Date;

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
            this.fecha_inicio = req.body.fecha_inicio;
            this.detalle = req.body.detalle;
            this.expediente_nro = req.body.expediente_nro;
            this.contraparte_nombre = req.body.contraparte_nombre;
            this.contraparte_dni = req.body.contraparte_dni;
            this.contraparte_dom_real = req.body.contraparte_dom_real;
            this.contraparte_dom_proc = req.body.contraparte_dom_proc;
            this.contraparte_telefono = req.body.contraparte_telefono;
            this.jurisdiccion_id = req.body.jurisdiccion_id;
            this.distrito_id = req.body.distrito_id;
            this.fuero_id = req.body.fuero_id;
            this.juzgado_id = req.body.juzgado_id;
            this.caracter_letrado_id = req.body.caracter_letrado_id;
            this.caracter_cliente_id = req.body.caracter_cliente_id;
            this.mesa = req.body.mesa;
            this.objeto_id = req.body.objeto_id;
            this.instancia_id = req.body.instancia_id;
            this.caratula = req.body.caratula;
            this.estado = req.body.estado;
            this.etapa = req.body.estapa;
            this.fecha_fin = req.body.fecha_fin;
            this.visible = req.body.visible;
      }

    }

}
