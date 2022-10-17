import {
	Column,
	Entity,
	Index,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { Profile } from "./Profile";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Index()
	@Column({ type: "character varying", length: 254, unique: true })
	email!: string;

	@Column({ type: "character varying", length: 255 })
	pseudo!: string;

	@Column("text")
	password!: string;

	@OneToOne(() => Profile, (p) => p.user)
	profile!: Relation<Profile>;
}
