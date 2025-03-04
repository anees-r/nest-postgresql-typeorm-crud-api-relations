import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Get('get/:email')
    async findOne(@Param('email') email: string){
        return this.userService.findOne(email);
    }

    @Post('create')
    async createUser(@Body() body: CreateUserDto){
        // when we dont use decorator, we can simply get the body object through this decorator
        // and then we can destruct the body object into required variables
        return this.userService.createUser(body);
    }


}
