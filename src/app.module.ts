import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoldersModule } from './holders/holders.module';
import { Holder } from './holders/entities/holders.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/users.entity';
import { GroupsModule } from './groups/groups.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { GroupMembersModule } from './group-members/group-members.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { MenusModule } from './menus/menus.module';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { Group } from './groups/entities/group.entity';
import { GroupMember } from './group-members/entities/group-member.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './order-items/entities/order-item.entity';
import { Menu } from './menus/entities/menu.entity';
import { MenuItem } from './menu-items/entities/menu-item.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          database: config.get<string>('DB_NAME'),
          username: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASSWORD'),
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          entities: [
            Holder,
            User,
            Restaurant,
            Group,
            GroupMember,
            Order,
            OrderItem,
            Menu,
            MenuItem,
          ],
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    HoldersModule,
    UsersModule,
    GroupsModule,
    RestaurantsModule,
    GroupMembersModule,
    OrdersModule,
    OrderItemsModule,
    MenusModule,
    MenuItemsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
