import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>){}

    async createUser(userDto: CreateUserDto){
        // we can pass direct arguments as well instead of dto, but dto allows us to validate our parameters
        const user = await this.userRepo.create(userDto);

        return await this.userRepo.save(user);
    }

    async findOne(email: string): Promise<User>{
        const user = await this.userRepo.findOneBy({email})
        if(!user){
            throw new NotFoundException('User not found!')
        }
        return user;
    }
}

