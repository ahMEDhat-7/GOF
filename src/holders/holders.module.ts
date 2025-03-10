import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoldersController } from './holders.controller';
import { HoldersService } from './holders.service';
import { Holder } from './holders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Holder])],
  controllers: [HoldersController],
  providers: [HoldersService],
  exports: [HoldersService],
})
export class HoldersModule {}
