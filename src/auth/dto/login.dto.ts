import { IsNotEmpty, IsString, Length } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
