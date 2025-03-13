import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HoldersService } from './../holders/holders.service';
import { USER_TYPE } from 'src/utils/constants';
import { hashPassword } from 'src/utils/genHash';
import { JwtPayloadType } from 'src/utils/types';
import { UserProfile } from './decorators/userProfile.decorator';
import { Holder } from 'src/holders/entities/holders.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => HoldersService))
    private readonly holdersService: HoldersService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const holderExt = await this.holdersService.findOne(dto.holder_id);
    if (!holderExt) {
      throw new NotFoundException(
        `Holder with ID "${dto.holder_id}" not found`,
      );
    }
    const userExt = await this.usersRepository.findOne({
      where: [
        { username: dto.username },
        { email: dto.email },
        { phoneNumber: dto.phoneNumber },
      ],
    });
    if (userExt) {
      throw new BadRequestException(
        `User with username "${dto.username}" or email "${dto.email}" already exists`,
      );
    }

    const user = this.usersRepository.create(dto);
    return this.usersRepository.save(user);
  }

  /**
   * get all users of specific holder
   * @param h_id holder id
   * @returns list of users
   */
  async findAll(h_id: string): Promise<User[]> {
    return this.usersRepository.find({
      where: { holder_id: h_id, role: USER_TYPE.USER },
    });
  }

  /**
   * get current user (logged in )
   * @Param id id of user
   * @return User data
   */
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }

  async UserProfile(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User not found`);
    // const holder = await this.holdersService.findOne(user.holder_id);

    return user;
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const { username, password } = dto;
    const user = await this.findOne(id);
    user.username = username ?? user.username;
    user.password = password ? await hashPassword(password) : user.password;
    return this.usersRepository.save(user);
  }

  /**
   * delete user by id if it's user itself of admin
   * @param id user id
   * @param payload jwt token
   */
  async remove(id: string, payload: JwtPayloadType): Promise<void> {
    const user = await this.findOne(id);
    if (
      (payload.role === USER_TYPE.ADMIN && user.holder_id === payload.id) ||
      payload.id === id
    ) {
      const result = await this.usersRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }
    } else {
      throw new ForbiddenException(
        'Access denied, You are not allowed to delete this user',
      );
    }
  }
}
