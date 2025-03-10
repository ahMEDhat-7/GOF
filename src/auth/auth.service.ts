import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { HoldersService } from 'src/holders/holders.service';
import { CreateHolderDto } from './../holders/dtos/create-holder.dto';
import { loginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly holdersService: HoldersService,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const { password } = userDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    userDto.password = hashedPassword;
    const user = await this.usersService.create(userDto);
    return 'TOKEN';
  }

  async createAdmin(adminDto: CreateHolderDto) {
    const { password } = adminDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    adminDto.password = hashedPassword;
    const admin = await this.holdersService.create(adminDto);
    return 'TOKEN';
  }

  async findUser(userDto: loginDto) {
    const { username, password } = userDto;
    const user = await this.usersService.findByUsername(username);
    return 'TOKEN';
  }
  async findAdmin(adminDto: loginDto) {
    const { username, password } = adminDto;
    const newAdmin = await this.holdersService.findByName(username);
    return 'TOKEN';
  }
}
