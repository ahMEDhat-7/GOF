import { Exclude } from 'class-transformer';
import { User } from '../../users/entities/users.entity';
import { CURRENT_TIMESTAMP } from 'src/utils/constants';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'Holders' })
@Unique(['name'])
export class Holder {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ length: 11, nullable: true, unique: true })
  phoneNumber: string;

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  @Exclude()
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.holder)
  users: User[];
}
