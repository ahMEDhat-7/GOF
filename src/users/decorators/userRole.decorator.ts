import { SetMetadata } from '@nestjs/common';
import { USER_TYPE } from 'src/utils/constants';

export const Roles = (...roles: USER_TYPE[]) => SetMetadata('roles', roles);
