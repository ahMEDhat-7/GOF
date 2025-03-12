import { USER_TYPE } from './constants';

export type JwtPayloadType = {
  id: string;
  role: USER_TYPE;
};

export type AccessTokenType = {
  token: string;
};
