import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne
} from "typeorm";
import { Employee } from "./Employee";
import { User } from "./User";

@Entity({ name: "companies" })
export class Company {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "name", type: "varchar", length: 200 })
    name: string;

    @Column({ name: "cnpj", type: "char", length: 14, unique: true })
    cnpj: string;

    @OneToMany(() => Employee, employee => employee.company, { eager: true })
    employees: Employee[];

    @ManyToOne(() => User, user => user.companies, { onDelete: "CASCADE" })
    owner: User;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;
}
