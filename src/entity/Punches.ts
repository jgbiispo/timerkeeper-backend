import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne
} from "typeorm";
import { Employee } from "./Employee";

export enum PunchType {
    start = "start",
    exit = "exit",
    pause = "pause",
}

@Entity({ name: "punches" })
export class Punch {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        name: "type",
        type: "enum",
        enum: PunchType
    })
    type: PunchType;

    @CreateDateColumn({ name: "timestamp", type: "timestamp" })
    timestamp: Date;

    @ManyToOne(() => Employee, employee => employee.punches, { onDelete: "CASCADE" })
    employee: Employee;
}
