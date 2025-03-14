import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { HoldersModule } from 'src/holders/holders.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersProvider } from './users.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HoldersModule, JwtModule],
  controllers: [UsersController],
  providers: [UsersService, UsersProvider],
  exports: [UsersService],
})
export class UsersModule {}
