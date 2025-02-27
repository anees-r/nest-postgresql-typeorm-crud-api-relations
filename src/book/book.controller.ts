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
        // this value of user will be derived from auth token
        // but as we are not doing auth yet, so i will hard code the user
        const user = {
            "id": "666693e7-b569-45c8-9874-8f878f8a0d9c",
            "name": "Anees",
            "email": "anees.dev2002@gmail.com",
            "password": "hardcodedpassword"
          }
        return this.bookService.createBook(body,user);
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

    @Get('by/:id')
    async findBookByUser(@Param('id') id: string){
        return this.bookService.findBookByUser(id);
    }
}
