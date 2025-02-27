import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update.user.dto';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>){}

    async createUser(userDto: CreateUserDto){
        // we can pass direct arguments as well instead of dto, but dto allows us to validate our parameters
        const user = await this.userRepo.create(userDto);

        return await this.userRepo.save(user);
    }

    async findAll(){
        // return all users
        return await this.userRepo.find()
    }

    async findOne(id: string): Promise<User>{
        const user = await this.userRepo.findOneBy({id})
        if(!user){
            throw new NotFoundException('User not found!')
        }
        return user;
    }

    async updateUser(id:string, updateUserDto: UpdateUserDto): Promise<User>{
        const user = await this.userRepo.findOneBy({id})
        if(!user){
            throw new NotFoundException('User not found!')
        }
        Object.assign(user, updateUserDto)
        return this.userRepo.save(user);
    }

    async deleteUser(id: string): Promise<void>{
        const user = await this.userRepo.findOneBy({id})
        if(!user){
            throw new NotFoundException('User not found!')
        }
        await this.userRepo.delete(id);
    }
}

