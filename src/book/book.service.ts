import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create.book.dto';
import { UpdateBookDto } from './dto/update.book.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private bookRepo: Repository<Book>) {}

  async findAll(): Promise<Book[]> {
    // get all the books
    return await this.bookRepo.find();
  }

  createBook(bookDto: CreateBookDto, user: any): Promise<Book> {
    // create book, idk why but we have to add there 3 dots before bookdto
    const book = this.bookRepo.create({...bookDto, user});
    // save book in database
    return this.bookRepo.save(book);
  }

  async findOne(id: string): Promise<Book> {
    // find book by id
    const book = await this.bookRepo.findOneBy({ id });

    // throw exception if book doesnt exist
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    // find book by id
    const book = await this.bookRepo.findOneBy({ id });

    // throw exception if book doesnt exist
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    // assign new values of properties to book
    Object.assign(book, updateBookDto);

    // save updated book in database
    return this.bookRepo.save(book);
  }

  async deleteBook(id: string): Promise<void> {
    // find book by id
    const book = await this.bookRepo.findOneBy({ id });

    // throw exception if book doesnt exist
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    // delete if book exists
    await this.bookRepo.delete(id);
  }

  async findBookByUser(id:string): Promise<Book[]>{
    // using querybuilder to apply innerjoin at both tables and fetch books by matching userid
    
    // if we have established a relation between the entities
    // const books = await this.bookRepo
    // .createQueryBuilder('book')
    // .innerJoinAndSelect('book.user','user')
    // .where('user.id = :id', {id})
    // .getMany();

    
    // if we dont have a relation between entities
    // const books = await this.bookRepo
    // .createQueryBuilder('book')
    // .innerJoin('user', 'user', 'book.userId = user.id') // from user (table) as user match book.userId to user.id
    // .select(['book.id', 'book.title', 'user.name'])
    // .where('user.id = :id', { id }) // show records of this user only
    // .getMany();
    // if we want to fetch data of books and user as well based on our condition we can use getRawMany()


    // writing simple typeorm query when we have a relation between entities (do this when queries are less complex)
    const books = await this.bookRepo.find(
      {
        where: { user: { id: id } }, // fitler books by entered user id
        relations: ['user'] // return the details of that user as well
      })

    return books;
  }
}
