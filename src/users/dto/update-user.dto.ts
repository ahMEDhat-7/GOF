import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// class CreateUserDtoTemp extends OmitType(CreateUserDto, [
//   'email',
//   'holder_id',
//   'phoneNumber',
// ]) {}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
