import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadType } from 'src/utils/types';
import { CURRENT_USER_KEY, USER_TYPE } from 'src/utils/constants';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: USER_TYPE[] = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles || roles.length === 0)
      throw new UnauthorizedException('Access denied');

    const req: Request = context.switchToHttp().getRequest();
    const [bear, token] = req.headers.authorization?.split(' ') ?? [];
    if (token && bear === 'Bearer') {
      try {
        const payload: JwtPayloadType = await this.jwtService.verifyAsync(
          token,
          {
            secret: this.configService.get('JWT_SECRET'),
          },
        );
        if (
          (payload.role === USER_TYPE.USER && req.params.id === payload.id) ||
          payload.role === USER_TYPE.ADMIN
        ) {
          req[CURRENT_USER_KEY] = payload;
          return true;
        }
      } catch (error) {
        throw new UnauthorizedException('Access denied, Invalid token');
      }
    } else {
      throw new UnauthorizedException('Access denied, no token provided');
    }
    return false;
  }
}
