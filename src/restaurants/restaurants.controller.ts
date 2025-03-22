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
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { UserPayload } from 'src/decorators/userPayload.decorator';
import { JwtPayloadType } from 'src/utils/types';
import { Roles } from 'src/decorators/userRole.decorator';
import { USER_TYPE } from 'src/utils/constants';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @Roles(USER_TYPE.ADMIN)
  @UseGuards(RolesGuard)
  create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @UserPayload() payload: JwtPayloadType,
  ) {
    const rest = {
      ...createRestaurantDto,
      created_by: payload.id,
    };
    console.log(rest);

    return this.restaurantsService.create(rest);
  }

  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(+id);
  }
}
