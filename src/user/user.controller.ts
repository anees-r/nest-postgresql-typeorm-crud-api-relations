import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Get('all')
    async findAll(){
        return this.userService.findAll();
    }

    @Get('get/:id')
    async findOne(@Param('id') id: string){
        return this.userService.findOne(id);
    }

    @Post('create')
    async createUser(@Body() body: CreateUserDto){
        // when we dont use decorator, we can simply get the body object through this decorator
        // and then we can destruct the body object into required variables
        return this.userService.createUser(body);
    }

    @Put('update/:id')
    async updateUser(@Param('id') id: string ,@Body() body: UpdateUserDto){
        return this.userService.updateUser(id,body);
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id: string){
        return this.userService.deleteUser(id);
    }


}
