import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Length,
} from 'class-validator';

export class LoginAdminDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
