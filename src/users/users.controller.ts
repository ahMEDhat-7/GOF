import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Headers,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserProfile } from './decorators/userProfile.decorator';
import { JwtPayloadType } from 'src/utils/types';
import { Roles } from './decorators/userRole.decorator';
import { USER_TYPE } from 'src/utils/constants';
import { RolesGuard } from './guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(USER_TYPE.ADMIN, USER_TYPE.SUPER)
  @UseGuards(RolesGuard)
  findAll(@UserProfile() payload: JwtPayloadType) {
    return this.usersService.findAll(payload.id);
  }

  @Get('/dashboard')
  @UseGuards(AuthGuard)
  findOne(@UserProfile() payload: JwtPayloadType) {
    const user = this.usersService.findOne(payload.id);
    return user;
  }

  @Patch()
  @UseGuards(AuthGuard)
  update(
    @UserProfile() payload: JwtPayloadType,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(payload.id, updateUserDto);
  }

  @Delete(':id')
  @Roles(USER_TYPE.ADMIN, USER_TYPE.USER)
  @UseGuards(RolesGuard)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @UserProfile() payload: JwtPayloadType,
  ) {
    return this.usersService.remove(id, payload);
  }
}
