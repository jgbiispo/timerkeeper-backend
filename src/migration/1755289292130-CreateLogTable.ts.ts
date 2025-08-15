import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLogTable1690000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Logs
        await queryRunner.query(`CREATE TYPE "logs_type_enum" AS ENUM('punch','user','employee');`);
        await queryRunner.query(`
        CREATE TABLE "logs" (
            "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            "type" "logs_type_enum" NOT NULL,
            "message" text NOT NULL,
            "entityId" uuid,
            "companyId" uuid,
            "created_at" TIMESTAMP DEFAULT now()
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "logs";`);
        await queryRunner.query(`DROP TYPE "logs_type_enum";`);
    }
}
