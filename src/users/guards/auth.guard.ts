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
import { CURRENT_USER_KEY } from 'src/utils/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
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
        req[CURRENT_USER_KEY] = payload;
      } catch (error) {
        throw new UnauthorizedException('Access denied, Invalid token');
      }
    } else {
      throw new UnauthorizedException('Access denied, no token provided');
    }
    return true;
  }
}
