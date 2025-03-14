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
import { JwtPayloadType } from 'src/utils/types';

@Injectable()
export class HoldersService {
  constructor(
    @InjectRepository(Holder)
    private holdersRepository: Repository<Holder>,
  ) {}

  /**
   * Creates a new holder
   * @param {CreateHolderDto} dto - Data transfer object containing holder information
   * @returns {Promise<Holder>} The created holder
   * @throws {BadRequestException} When a holder with the same name already exists
   */
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

  /**
   * Retrieves all holders
   * @returns {Promise<Holder[]>} Array of holders with limited fields (id, name, phoneNumber)
   */
  async findAll(): Promise<Holder[]> {
    return this.holdersRepository.find({
      select: { id: true, name: true, phoneNumber: true },
    });
  }

  /**
   * Finds a holder by ID
   * @param {string} id - The unique identifier of the holder
   * @returns {Promise<Holder>} The found holder
   * @throws {NotFoundException} When no holder with the given ID exists
   */
  async findOne(id: string): Promise<Holder> {
    const holder = await this.holdersRepository.findOne({ where: { id } });
    if (!holder) {
      throw new NotFoundException(`Holder with ID "${id}" not found`);
    }
    return holder;
  }

  /**
   * Finds a holder by name
   * @param {string} name - The name of the holder to find
   * @returns {Promise<Holder | null>} The found holder or null if not found
   */
  async findByName(name: string): Promise<Holder | null> {
    const holder = await this.holdersRepository.findOne({ where: { name } });
    return holder;
  }

  /**
   * Updates an existing holder
   * @param {JwtPayloadType} payload
   * @param {UpdateHolderDto} dto - Data transfer object with updated information
   * @returns {Promise<Holder>} The updated holder
   * @throws {NotFoundException} When no holder with the given ID exists
   */
  async update(payload: JwtPayloadType, dto: UpdateHolderDto): Promise<Holder> {
    const holder = await this.findOne(payload.id);
    this.holdersRepository.merge(holder, dto);
    return this.holdersRepository.save(holder);
  }

  /**
   * Removes a holder by its creator
   * @param {JwtPayloadType} payload
   * @returns {Promise<void>}
   * @throws {NotFoundException} When no holder with the given ID exists
   */
  async remove(payload: JwtPayloadType): Promise<void> {
    const result = await this.holdersRepository.delete(payload.id);
    if (result.affected === 0) {
      throw new NotFoundException(`Holder not found`);
    }
  }
}
