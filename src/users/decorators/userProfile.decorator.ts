import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { CURRENT_USER_KEY } from 'src/utils/constants';
import { JwtPayloadType } from 'src/utils/types';

/**
 * Get payload decoded from jwt token
 * @returns payload object { id , role }
 */
export const UserProfile = createParamDecorator(
  (data, context: ExecutionContext): JwtPayloadType => {
    const request: Request = context.switchToHttp().getRequest();
    const payload: JwtPayloadType = request[CURRENT_USER_KEY];
    return payload;
  },
);
