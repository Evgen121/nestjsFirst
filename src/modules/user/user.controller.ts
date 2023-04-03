import { Controller, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    /*   @Get()
      getUsers() {
          return this.userService.getUsers()
  
      } */

    @Post('register')
    createUser(@Body() dto: CreateUserDto) {
        return this.userService.createUsers(dto)
    }
}
