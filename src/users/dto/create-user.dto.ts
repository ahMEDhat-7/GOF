import {
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  Matches,
  IsEmail,
  IsUUID,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  holder_id: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^01[0-25][0-9]{8}$/, {
    message:
      'Phone number must be a valid Egyptian number (starts with 010, 011, 012, 015)',
  })
  phoneNumber: string;
}
