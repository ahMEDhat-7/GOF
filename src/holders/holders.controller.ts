import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HoldersService } from './holders.service';
import { CreateHolderDto } from './dtos/create-holder.dto';
import { UpdateHolderDto } from './dtos/update-holder.dto';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { USER_TYPE } from 'src/utils/constants';
import { Roles } from 'src/users/decorators/userRole.decorator';

@Controller('holders')
export class HoldersController {
  constructor(private readonly holdersService: HoldersService) {}

  @Get()
  @Roles(USER_TYPE.SUPER)
  @UseGuards(RolesGuard)
  find() {
    return this.holdersService.findAll();
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHolderDto: UpdateHolderDto) {
    return this.holdersService.update(id, updateHolderDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.holdersService.findOne(id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.holdersService.remove(id);
  }
}
