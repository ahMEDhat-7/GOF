import { IsNotEmpty, IsString } from 'class-validator';
import { LoginAdminDto } from './login-admin.dto';

export class LoginUserDto extends LoginAdminDto {
  @IsNotEmpty()
  @IsString()
  holder_id: string;
}
