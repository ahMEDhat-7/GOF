import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Holder } from './entities/holders.entity';
import { CreateHolderDto } from './dtos/create-holder.dto';
import { UpdateHolderDto } from './dtos/update-holder.dto';

@Injectable()
export class HoldersService {
  constructor(
    @InjectRepository(Holder)
    private holdersRepository: Repository<Holder>,
  ) {}

  async create(dto: CreateHolderDto): Promise<Holder> {
    const holderExt = await this.findByName(dto.name);
    if (holderExt) {
      throw new BadRequestException(
        `Holder with name "${dto.name}" already has admin`,
      );
    }

    const holder = this.holdersRepository.create(dto);
    return this.holdersRepository.save(holder);
  }

  async findAll(): Promise<Holder[]> {
    return this.holdersRepository.find({
      select: { id: true, name: true, phoneNumber: true },
    });
  }

  async findOne(id: string): Promise<Holder> {
    const holder = await this.holdersRepository.findOne({ where: { id } });
    if (!holder) {
      throw new NotFoundException(`Holder with ID "${id}" not found`);
    }
    return holder;
  }
  async findByName(name: string): Promise<Holder | null> {
    const holder = await this.holdersRepository.findOne({ where: { name } });
    return holder;
  }

  async update(id: string, dto: UpdateHolderDto): Promise<Holder> {
    const holder = await this.findOne(id);
    this.holdersRepository.merge(holder, dto);
    return this.holdersRepository.save(holder);
  }

  async remove(id: string): Promise<void> {
    const result = await this.holdersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Holder with ID "${id}" not found`);
    }
  }
}
