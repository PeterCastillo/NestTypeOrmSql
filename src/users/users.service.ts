import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { DtoCreateUser } from './dto/dtoCreateUser';
import { DtoUpdateUser } from './dto/dtoUpdateUser';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: DtoCreateUser) {
    const validarUserName = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });
    if (validarUserName) {
      return new HttpException('Usuario ya existente', HttpStatus.CONFLICT);
    } 
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  listarUsuarios() {
    return this.userRepository.find();
  }

  obtenerUsuarioPorId(user_id: number) {
    return this.userRepository.findOne({
      where: {
        id: user_id,
      },
    });
  }

  async eliminarUsuarioPorId(user_id: number) {
    const result = await this.userRepository.delete(user_id)
    if(result.affected === 0){
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
    }
    return result
  }

  async actualizarUsuario(user_id: number, newInfo: DtoUpdateUser) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: user_id
      }
    })
    if(!userFound){
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
    }
    const updateUser = Object.assign(userFound,newInfo)
    return this.userRepository.save(updateUser)
  }
}
