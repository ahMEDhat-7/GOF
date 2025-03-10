import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HoldersModule } from 'src/holders/holders.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, HoldersModule],
})
export class AuthModule {}
