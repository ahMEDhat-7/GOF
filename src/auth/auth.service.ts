import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { HoldersService } from 'src/holders/holders.service';
import { CreateHolderDto } from './../holders/dtos/create-holder.dto';
import { loginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType, AccessTokenType } from '../utils/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly holdersService: HoldersService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<AccessTokenType> {
    const { password } = userDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    userDto.password = hashedPassword;
    const user = await this.usersService.create(userDto);
    const token = await this.genJwtToken({
      id: user.id,
      role: 'user',
    });
    return { token };
  }

  async createAdmin(adminDto: CreateHolderDto): Promise<AccessTokenType> {
    const { password } = adminDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    adminDto.password = hashedPassword;
    const admin = await this.holdersService.create(adminDto);
    const token = await this.genJwtToken({
      id: admin.id,
      role: 'admin',
    });
    return { token };
  }

  /**
   * Login Service for user
   * @param userDto data to login
   * @returns JWT (access token)
   */
  async findUser(userDto: loginDto): Promise<AccessTokenType> {
    const { username, password } = userDto;
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new BadRequestException('Invalid username or password');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new BadRequestException('Invalid username or password');
    const token = await this.genJwtToken({
      id: user.id,
      role: 'user',
    });
    return { token };
  }
  async findAdmin(adminDto: loginDto): Promise<AccessTokenType> {
    const { username, password } = adminDto;
    const admin = await this.holdersService.findByName(username);
    if (!admin) throw new BadRequestException('Invalid username or password');
    const match = await bcrypt.compare(password, admin.password);
    if (!match) throw new BadRequestException('Invaild username or password');

    const token = await this.genJwtToken({
      id: admin.id,
      role: 'admin',
    });
    return { token };
  }
  /**
   * JWT Service for Generating access token
   * @param payload id , role
   * @returns token
   */
  private genJwtToken(payload: JwtPayloadType) {
    return this.jwtService.signAsync(payload);
  }
}
