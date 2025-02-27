import { Book } from "src/book/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({unique:true})
    email: string

    @Column()
    password: string

    // this require first method to point to a Target Entity
    // this requires second method to declare the traget field (ie attribute of the entity)

    // so it tells the decorator that this property of User will be connected Book entity and 
    // current instance of User will be linked to book.user
    @OneToMany(()=>Book, (book)=>book.user)
    books: Book[]
}