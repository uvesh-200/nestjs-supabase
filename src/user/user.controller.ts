import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() body: Partial<User>): Promise<User> {
        return this.userService.create(body);
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {
        return this.userService.getById(id);
    }

}
