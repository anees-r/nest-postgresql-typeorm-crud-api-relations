import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

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
    async createUser(@Body() body){
        // when we dont use decorator, we can simply get the body object through this decorator
        // and then we can destruct the body object into required variables
        const {name, email, password} = body
        return this.userService.createUser(name,email,password);
    }

    @Put('update/:id')
    async updateUser(@Param('id') id: string ,@Body() body){
        const {name, email, password} = body
        return this.userService.updateUser(id,name,email,password);
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id: string){
        return this.userService.deleteUser(id);
    }


}
