import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    // this require first method to point to a Target Entity
    // this requires second method to declare the traget field (ie attribute of the entity)

    // so it tells the decorator that this property of Book will be connected User entity and 
    // current instance of book will be linked to user.books

    // and we will save this in controller and server of the Many side of relation
    @ManyToOne(()=>User, (user)=>user.books)
    user: User
}