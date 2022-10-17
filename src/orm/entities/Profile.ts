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
} from "typeorm";
import type { Relation } from "typeorm";
import { ShortUrl } from "./ShortUrl";
import { User } from "./User";

@Entity()
export class Profile {
	@PrimaryGeneratedColumn()
	id!: number;

	@Index()
	@Generated("uuid")
	@Column({ type: "uuid", unique: true })
	uuid!: string;

	@Column({ type: "boolean", default: false })
	verified!: boolean;

	@Index()
	@Column({
		length: 20,
		type: "character varying",
		nullable: true,
	})
	urlName!: string;

	@Column({ type: "boolean", default: false })
	urlActive!: boolean;

	@Column({ type: "boolean", default: false })
	vip!: boolean;

	@Column({ type: "integer", default: 25 })
	maxUrls!: number;

	@Column({ type: "integer", default: 25 })
	availableUrls!: number;

	@CreateDateColumn({ type: "timestamptz" })
	createdAt!: Date;

	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt!: Date;

	@OneToOne(() => User, (u) => u.profile, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn()
	user!: Relation<User>;

	@OneToMany(() => ShortUrl, (s) => s.profile, {
		cascade: true,
		onDelete: "CASCADE",
	})
	shortUrls!: Relation<ShortUrl[]>;
}
