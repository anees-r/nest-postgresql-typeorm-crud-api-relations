import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookController } from './book.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Book])],
  providers: [BookService],
  controllers: [BookController]
})
export class BookModule {}
