import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Profile } from './Profile';

@Entity('urls')
export class Url {
  @PrimaryGeneratedColumn()
  id!: number;

  // NOTE: Url UUID
  @Index()
  @Generated('uuid')
  @Column({ type: 'uuid', unique: true })
  uuid!: string;

  // NOTE: Generated Url
  @Index()
  @Column({ type: 'text', unique: true })
  generatedUrl!: string;

  // NOTE: Redirect To
  @Column({ type: 'character varying', length: 500 })
  redirect!: string;

  // NOTE: Use number
  @Column({ type: 'bigint', default: 0 })
  useCount!: number;

  // NOTE: If ephemeral is enabled
  @Column({ type: 'boolean', default: true })
  ephemeral!: boolean;

  // NOTE: Duration on seconds if ephemeral is enabled
  @Column({ type: 'integer', default: 86400 })
  duration!: number;

  // NOTE: If this use Url Name
  @Column({ type: 'boolean', default: false })
  useUrlName!: boolean;

  // NOTE: Active or Not
  @Column({ type: 'boolean', default: true })
  enabled!: boolean;

  // NOTE: Restricted
  @Column({ type: 'boolean', default: false })
  restricted!: boolean;

  // NOTE: Url creation date
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  // NOTE: Url update date
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(() => Profile, (p) => p.urls)
  profile!: Relation<Profile>;
}
