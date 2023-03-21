import { Body, Controller, Post } from '@nestjs/common';
import { DtoCreateUser } from './dto/dtoCreateUser';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() newUser: DtoCreateUser) {
    return this.userService.createUser(newUser);
  }
}
