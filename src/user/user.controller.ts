import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth/supabase-auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() body: Partial<User>): Promise<User> {
        return this.userService.create(body);
    }

    @UseGuards(SupabaseAuthGuard)
    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {
        return this.userService.getById(id);
    }

}
