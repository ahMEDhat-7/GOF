import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { HoldersService } from 'src/holders/holders.service';
import { CreateHolderDto } from './../holders/dtos/create-holder.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { LoginUserDto } from './dto/login-user.dto';
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

  async registerUser(userDto: CreateUserDto): Promise<AccessTokenType> {
    const { password } = userDto;
    userDto.password = await hashPassword(password);
    const user = await this.usersService.create(userDto);
    const token = await this.genJwtToken({
      id: user.id,
      c_id: userDto.holder_id,
      role: USER_TYPE.USER,
    });
    return { token };
  }

  async registerAdmin(adminDto: CreateHolderDto): Promise<AccessTokenType> {
    const { password } = adminDto;
    adminDto.password = await hashPassword(password);
    const admin = await this.holdersService.create(adminDto);
    const token = await this.genJwtToken({
      id: admin.id,
      c_id: '#',
      role: USER_TYPE.ADMIN,
    });
    return { token };
  }

  /**
   * Login Service for user
   * @param userDto data to login
   * @returns JWT (access token)
   */
  async loginUser(userDto: LoginUserDto): Promise<AccessTokenType> {
    const { username, password, holder_id } = userDto;
    const user = await this.usersService.findByUsername(username, holder_id);
    if (!user) throw new BadRequestException('Invalid username or password');
    const match = await isHashMatch(password, user.password);
    if (!match) throw new BadRequestException('Invalid username or password');
    const token = await this.genJwtToken({
      id: user.id,
      c_id: userDto.holder_id,
      role: USER_TYPE.USER,
    });
    return { token };
  }
  async loginAdmin(adminDto: LoginAdminDto): Promise<AccessTokenType> {
    const { username, password } = adminDto;
    const admin = await this.holdersService.findByName(username);
    if (!admin) throw new BadRequestException('Invalid username or password');
    const match = await isHashMatch(password, admin.password);
    if (!match) throw new BadRequestException('Invaild username or password');

    const token = await this.genJwtToken({
      id: admin.id,
      c_id: '#',
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
