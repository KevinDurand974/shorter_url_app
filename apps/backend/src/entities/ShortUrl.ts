import {
	Column,
	CreateDateColumn,
	Entity,
	Generated,
	Index,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { Profile } from "./Profile";

@Entity()
export class ShortUrl {
	@PrimaryGeneratedColumn()
	id!: number;

	@Index()
	@Generated("uuid")
	@Column({ type: "uuid", unique: true })
	uuid!: string;

	@Index()
	@Column({ type: "text", unique: true })
	generatedUrl!: string;

	@Column({ type: "character varying", length: 500 })
	redirect!: string;

	@Column({ type: "bigint", default: 0 })
	useCount!: number;

	@Column({ type: "boolean", default: true })
	ephemeral!: boolean;

	@Column({ type: "integer", default: 86400 })
	duration!: number;

	@Column({ type: "boolean", default: false })
	useUrlName!: boolean;

	@CreateDateColumn({ type: "timestamptz" })
	createdAt!: Date;

	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt!: Date;

	@ManyToOne(() => Profile, (p) => p.shortUrls)
	profile!: Relation<Profile>;
}
