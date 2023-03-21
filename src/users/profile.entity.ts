import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_profile')
export class Profile {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string
     
    @Column()
    lastname: string

    @Column({default: 100})
    age: number
}