import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { DtoCreateUser } from "./dto/dtoCreateUser"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  createUser(user: DtoCreateUser){
    const newUser = this.userRepository.create(user)
    return this.userRepository.save(newUser)
  }
}
