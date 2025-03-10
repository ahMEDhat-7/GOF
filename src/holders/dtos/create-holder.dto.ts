import {
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';

export class CreateHolderDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  password: string;

  @IsOptional()
  @IsString()
  @Length(11, 11)
  @Matches(/^01[0-25][0-9]{8}$/, {
    message:
      'Phone number must be a valid Egyptian number (starts with 010, 011, 012, 015)',
  })
  phoneNumber?: string;
}
