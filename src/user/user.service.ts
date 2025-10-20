import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async create(data: Partial<User>) : Promise<User> {
        const userData = await this.userRepository.create(data)

        return this.userRepository.save(userData);
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getById(id: string): Promise<User> {
        const user = await this.userRepository.findOneBy({id});

        if(!user) {
            throw new NotFoundException(`User not found with ${id}`);
        }

        return user;
    }
}
