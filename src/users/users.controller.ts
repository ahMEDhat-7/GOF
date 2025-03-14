import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UserPayload } from 'src/decorators/userPayload.decorator';
import { JwtPayloadType } from 'src/utils/types';
import { Roles } from '../decorators/userRole.decorator';
import { USER_TYPE } from 'src/utils/constants';
import { RolesGuard } from '../guards/roles.guard';
import { UsersProvider } from './users.provider';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersProvider: UsersProvider,
  ) {}

  @Get()
  @Roles(USER_TYPE.ADMIN)
  @UseGuards(RolesGuard)
  findAll(@UserPayload() payload: JwtPayloadType) {
    return this.usersService.findAll(payload.id);
  }

  @Get('/dashboard')
  @UseGuards(AuthGuard)
  findOne(@UserPayload() payload: JwtPayloadType) {
    const user = this.usersProvider.UserProfile(payload.id);
    return user;
  }

  @Patch()
  @UseGuards(AuthGuard)
  update(
    @UserPayload() payload: JwtPayloadType,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(payload.id, updateUserDto);
  }

  @Delete(':id')
  @Roles(USER_TYPE.ADMIN, USER_TYPE.USER)
  @UseGuards(RolesGuard)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @UserPayload() payload: JwtPayloadType,
  ) {
    return this.usersService.remove(id, payload);
  }
}
