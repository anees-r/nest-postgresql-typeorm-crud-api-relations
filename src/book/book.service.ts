import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create.book.dto';
import { UpdateBookDto } from './dto/update.book.dto';

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
}
