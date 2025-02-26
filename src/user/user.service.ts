import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>){}

    async createUser(name: string, email: string, password: string){
        // we can pass direct arguments as well instead of dto, but dto allows us to validate our parameters
        const user = await this.userRepo.create({name, email, password});

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

    async updateUser(id: string, name: string, email: string, password: string): Promise<User>{
        const user = await this.userRepo.findOneBy({id})
        if(!user){
            throw new NotFoundException('User not found!')
        }
        Object.assign(user, {name, email, password})
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

