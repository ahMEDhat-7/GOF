import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { CreateHolderDto } from 'src/holders/dtos/create-holder.dto';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  registerAsUser(@Body() userDto: CreateUserDto) {
    return this.authService.createUser(userDto);
  }
  @Post('/admin/register')
  registerAsAdmin(@Body() holderDto: CreateHolderDto) {
    return this.authService.createAdmin(holderDto);
  }

  @Post('/admin/login')
  @HttpCode(HttpStatus.OK)
  loginAsAdmin(@Body() userDto: loginDto) {
    return this.authService.findAdmin(userDto);
  }
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  loginAsUser(@Body() adminDto: loginDto) {
    return this.authService.findUser(adminDto);
  }
}
