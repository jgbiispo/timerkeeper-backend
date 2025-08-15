import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";

export enum LogType {
    PUNCH = "punch",
    USER = "user",
    EMPLOYEE = "employee"
}

@Entity({ name: "logs" })
export class Log {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "enum", enum: LogType })
    type: LogType;

    @Column({ type: "text" })
    message: string;

    @Column({ type: "uuid", nullable: true })
    entityId?: string;

    @Column({ type: "uuid", nullable: true })
    companyId?: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;
}
