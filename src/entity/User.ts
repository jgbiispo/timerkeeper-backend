import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { Company } from "./Company";

export enum UserRole {
    OWNER = "owner",
    MANAGER = "manager"
}

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "name", type: "varchar", length: 200 })
    name: string;

    @Column({ name: "email", type: "varchar", length: 200, unique: true })
    email: string;

    @Column({ name: "password", type: "varchar", length: 255 })
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.OWNER,
        name: "role"
    })
    role: UserRole;

    @OneToMany(() => Company, company => company.owner)
    companies: Company[];

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;
}
