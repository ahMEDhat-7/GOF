import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { HoldersService } from 'src/holders/holders.service';
import { CreateHolderDto } from './../holders/dtos/create-holder.dto';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType, AccessTokenType } from '../utils/types';
import { USER_TYPE } from 'src/utils/constants';
import { isHashMatch, hashPassword } from 'src/utils/genHash';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly holdersService: HoldersService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<AccessTokenType> {
    const { password } = userDto;
    userDto.password = await hashPassword(password);
    const user = await this.usersService.create(userDto);
    const token = await this.genJwtToken({
      id: user.id,
      role: USER_TYPE.USER,
    });
    return { token };
  }

  async createAdmin(adminDto: CreateHolderDto): Promise<AccessTokenType> {
    const { password } = adminDto;
    adminDto.password = await hashPassword(password);
    const admin = await this.holdersService.create(adminDto);
    const token = await this.genJwtToken({
      id: admin.id,
      role: USER_TYPE.ADMIN,
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
    const match = await isHashMatch(password, user.password);
    if (!match) throw new BadRequestException('Invalid username or password');
    const token = await this.genJwtToken({
      id: user.id,
      role: USER_TYPE.USER,
    });
    return { token };
  }
  async findAdmin(adminDto: loginDto): Promise<AccessTokenType> {
    const { username, password } = adminDto;
    const admin = await this.holdersService.findByName(username);
    if (!admin) throw new BadRequestException('Invalid username or password');
    const match = await isHashMatch(password, admin.password);
    if (!match) throw new BadRequestException('Invaild username or password');

    const token = await this.genJwtToken({
      id: admin.id,
      role: USER_TYPE.ADMIN,
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
