import {
  BadRequestException,
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
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => HoldersService))
    private readonly holdersService: HoldersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
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

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
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

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    this.usersRepository.merge(user, dto);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }
}
