import { Injectable } from '@nestjs/common';
import { HoldersService } from '../holders/holders.service';
import { UsersService } from './users.service';

@Injectable()
export class UsersProvider {
  constructor(
    private readonly usersService: UsersService,
    private readonly holdersService: HoldersService,
  ) {}

  async UserProfile(id: string) {
    const user = await this.usersService.findOne(id);
    const holder = await this.holdersService.findOne(user.holder_id);

    const userInfo = {
      holder: holder.name,
      name: user.username,
      email: user.email,
      phone: user.phoneNumber,
    };
    return userInfo;
  }
}
