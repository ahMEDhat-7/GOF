import { PartialType } from '@nestjs/mapped-types';
import { CreateHolderDto } from './create-holder.dto';

export class UpdateHolderDto extends PartialType(CreateHolderDto) {}
