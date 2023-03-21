import {
  ParseIntPipe,
  Param,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { Delete, Put } from '@nestjs/common/decorators';
import { DtoCreateUser } from './dto/dtoCreateUser';
import { DtoUpdateUser } from './dto/dtoUpdateUser';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() newUser: DtoCreateUser){
    return this.userService.createUser(newUser);
  }

  @Get()
  listarUsers(): Promise<User[]> {
    return this.userService.listarUsuarios();
  }

  @Get(':id')
  obetemerUsuarioPorId(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.obtenerUsuarioPorId(id);
  }

  @Delete(':id')
  eliminarUsuarioPorId(@Param('id', ParseIntPipe) id: number) {
    return this.userService.eliminarUsuarioPorId(id);
  }

  @Put(':id')
  actualizarUsuario(
    @Body() newUser: DtoUpdateUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.actualizarUsuario(id,newUser)
  }
}
