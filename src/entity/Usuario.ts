import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column({type: "int",unsigned: true })
    dni_usuario: number;

    @Column({
        type: "varchar",
        length: 50,
           })
    nombre: string;

    @Column({
        type: "varchar",
        length: 50,
           })
    apellido: string;

    @Column({type: "int",unsigned: true })
    tipo_id: number;

    @Column({
        type: "varchar",
        length: 100,
           })
    domicilio_procesal: string;

    @Column({
        type: "varchar",
        length: 30,
        nullable:true
           })
    matricula: string;

    @Column({
        type: "varchar",
        length: 50,
        unique: true
           })
    usuario: string;

    @Column({
        type: "varchar",
        length: 50,
        unique: true
           })
    password: string;

    @Column({type: "int",unsigned: true })
    estudio_id: number;

    @Column({
        type: "varchar",
        length: 50,
        unique: true
           })
    email: string;

    @Column({type: "int",unsigned: true })
    nivel_usuario_id: number;

    @Column({default:true })
    estado: boolean;

    @Column({type: "date",nullable:false})
    fecha_alta: Date;

    @Column({type: "date"})
    fecha_baja: Date;

}
