import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { HoldersService } from './holders.service';
import { CreateHolderDto } from './dtos/create-holder.dto';
import { UpdateHolderDto } from './dtos/update-holder.dto';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { CURRENT_USER_KEY, USER_TYPE } from 'src/utils/constants';
import { Roles } from 'src/users/decorators/userRole.decorator';
import { AuthGuard } from './../users/guards/auth.guard';
import { JwtPayloadType } from 'src/utils/types';
import { Request } from 'express';

@Controller('holders')
export class HoldersController {
  constructor(private readonly holdersService: HoldersService) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHolderDto: UpdateHolderDto) {
    return this.holdersService.update(id, updateHolderDto);
  }
  @Get()
  @UseGuards(AuthGuard)
  findOne(@Req() req: Request) {
    return this.holdersService.findOne(req[CURRENT_USER_KEY].id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.holdersService.remove(id);
  }
}
