import { Column, Entity, Index, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Profile } from './Profile';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id!: number;

  refreshToken!: string;

  maxAge!: number;

  @OneToOne(() => Profile, (p) => p.user)
  profile!: Relation<Profile>;
}
