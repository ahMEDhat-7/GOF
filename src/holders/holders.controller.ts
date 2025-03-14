import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HoldersService } from './holders.service';
import { UpdateHolderDto } from './dtos/update-holder.dto';
import { USER_TYPE } from 'src/utils/constants';
import { Roles } from 'src/decorators/userRole.decorator';
import { JwtPayloadType } from 'src/utils/types';
import { UserPayload } from 'src/decorators/userPayload.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Roles(USER_TYPE.ADMIN)
@UseGuards(RolesGuard)
@Controller('holders')
export class HoldersController {
  constructor(private readonly holdersService: HoldersService) {}

  @Get()
  findOne(@UserPayload() payload: JwtPayloadType) {
    return this.holdersService.findOne(payload.id);
  }

  @Patch()
  update(
    @UserPayload() payload: JwtPayloadType,
    @Body() updateHolderDto: UpdateHolderDto,
  ) {
    return this.holdersService.update(payload, updateHolderDto);
  }

  @Delete()
  remove(@UserPayload() payload: JwtPayloadType) {
    return this.holdersService.remove(payload);
  }
}
