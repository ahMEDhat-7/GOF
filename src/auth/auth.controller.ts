import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateHolderDto } from 'src/holders/dtos/create-holder.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  registerAsUser(@Body() userDto: CreateUserDto) {
    return this.authService.registerUser(userDto);
  }
  @Post('/admin/register')
  registerAsAdmin(@Body() holderDto: CreateHolderDto) {
    return this.authService.registerAdmin(holderDto);
  }

  @Post('/admin/login')
  @HttpCode(HttpStatus.OK)
  loginAsAdmin(@Body() userDto: LoginAdminDto) {
    return this.authService.loginAdmin(userDto);
  }
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  loginAsUser(@Body() adminDto: LoginUserDto) {
    return this.authService.loginUser(adminDto);
  }
}
