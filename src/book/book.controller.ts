import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create.book.dto';
import { UpdateBookDto } from './dto/update.book.dto';

@Controller('books')
export class BookController {
    constructor(private bookService: BookService){}

    @Get('all')
    async findAll(){
        return this.bookService.findAll();
    }

    @Post('create')
    async createBook(@Body() body: CreateBookDto){
        return this.bookService.createBook(body);
    }

    @Get('get/:id')
    async findOne(@Param('id') id: string){
        return this.bookService.findOne(id);
    }

    @Put('update/:id')
    async updateBook(@Param('id') id: string, @Body() body: UpdateBookDto){
        return this.bookService.updateBook(id, body);
    }

    @Delete('delete/:id')
    async deleteBook(@Param('id') id: string){
        return this.bookService.deleteBook(id);
    }
}
