import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Url } from './Url';
import { User } from './User';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  // NOTE: Profile UUID
  @Index()
  @Generated('uuid')
  @Column({ type: 'uuid', unique: true })
  uuid!: string;

  // NOTE: is Email verified
  @Column({ type: 'boolean', default: false })
  verified!: boolean;

  // NOTE: Url Name for generated Urls
  @Index()
  @Column({
    length: 20,
    type: 'character varying',
    nullable: true,
  })
  urlName!: string;

  // NOTE: If the user is VIP
  @Column({ type: 'boolean', default: false })
  vip!: boolean;

  // NOTE: Maximum number of urls the user can create
  @Column({ type: 'integer', default: 25 })
  maxUrls!: number;

  // NOTE: Available number of urls the user can create
  @Column({ type: 'integer', default: 25 })
  availableUrls!: number;

  // NOTE: Profile creation date
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  // NOTE: Profile update date
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @OneToOne(() => User, (u) => u.profile, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user!: Relation<User>;

  @OneToMany(() => Url, (s) => s.profile, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  urls!: Relation<Url[]>;
}
