import { Column, CreateDateColumn, Entity, Index, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Profile } from './Profile';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('uuid')
  uuid!: string;

  @Column()
  token!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Column()
  expiredAt!: Date;

  @OneToOne(() => Profile, (p) => p.user)
  profile!: Relation<Profile>;
}
