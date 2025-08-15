import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
} from "typeorm";
import { Company } from "./Company";
import { Punch } from "./Punches";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    MANAGER = "manager",
}

@Entity({ name: "employees" })
export class Employee {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "numberFunc", type: "varchar", length: 50, nullable: true })
    numberFunc?: string;

    @Column({ name: "name", type: "varchar", length: 200 })
    name: string;

    @Column({ name: "doc", type: "char", length: 11, unique: true })
    doc: string;

    @Column({ name: "tel", type: "varchar", length: 15, nullable: true })
    tel?: string;

    @Column({ name: "email", type: "varchar", length: 200, unique: true })
    email: string;

    @Column({ name: "password", type: "varchar", length: 255 })
    password: string;

    @Column({ name: "active", default: true })
    active: boolean;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
        name: "role"
    })
    role: UserRole;

    @ManyToOne(() => Company, company => company.employees, { onDelete: "CASCADE" })
    company: Company;

    @OneToMany(() => Punch, punch => punch.employee)
    punches: Punch[];

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;
}
