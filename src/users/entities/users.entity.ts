import { CURRENT_TIMESTAMP } from 'src/utils/constants';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Holder } from '../../holders/entities/holders.entity';
import { Exclude } from 'class-transformer';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'uuid' })
  @Exclude()
  holder_id: string;

  @Column({ type: 'varchar', length: 255 })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 11, unique: true })
  phoneNumber: string;

  @Column({ type: 'enum', enum: ['user', 'super'], default: 'user' })
  @Exclude()
  role: 'user' | 'super';

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

  @ManyToOne(() => Holder, (holder) => holder.users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'holder_id' })
  holder: Holder;
}
