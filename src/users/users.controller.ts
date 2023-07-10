import { Controller, Get, Post, Body, UseInterceptors, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.interface';
import { ResponseInterceptor } from './interceptors/response.interceptor';

@Controller('users')
@UseInterceptors(ResponseInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }


  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }


  // @Get('error')
  // throwError() {
  //   throw new InternalServerErrorException('An internal server error shows');
  // }
}
