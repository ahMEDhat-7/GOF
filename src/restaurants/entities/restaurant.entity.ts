import { Holder } from '../../holders/entities/holders.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'Restaurants' })
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false, unique: true })
  name: string;

  @Column({ length: 11, nullable: false, unique: true })
  phoneNumber: string;

  @Column({ nullable: true })
  img_url: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  updatedAt: Date;

  @ManyToOne(() => Holder, (holder) => holder.restaurants)
  @JoinColumn({ name: 'created_by' })
  created_by: Holder;
}
