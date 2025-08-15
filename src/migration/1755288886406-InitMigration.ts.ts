import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1690000000000 implements MigrationInterface {
    name = "InitMigration1690000000000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Users
        await queryRunner.query(`
            CREATE TYPE "users_role_enum" AS ENUM('owner', 'manager');
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                "name" varchar(200) NOT NULL,
                "email" varchar(200) UNIQUE NOT NULL,
                "password" varchar(255) NOT NULL,
                "role" "users_role_enum" NOT NULL DEFAULT 'owner',
                "created_at" TIMESTAMP DEFAULT now(),
                "updated_at" TIMESTAMP DEFAULT now()
            );
        `);

        // Companies
        await queryRunner.query(`
            CREATE TABLE "companies" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                "name" varchar(200) NOT NULL,
                "cnpj" char(14) UNIQUE NOT NULL,
                "ownerId" uuid,
                "created_at" TIMESTAMP DEFAULT now(),
                "updated_at" TIMESTAMP DEFAULT now(),
                CONSTRAINT "FK_company_owner" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE
            );
        `);

        // Employees
        await queryRunner.query(`
            CREATE TYPE "employees_role_enum" AS ENUM('admin', 'user', 'manager');
        `);
        await queryRunner.query(`
            CREATE TABLE "employees" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                "numberFunc" varchar(50),
                "name" varchar(200) NOT NULL,
                "doc" char(11) UNIQUE NOT NULL,
                "tel" varchar(15),
                "email" varchar(200) UNIQUE NOT NULL,
                "password" varchar(255) NOT NULL,
                "active" boolean DEFAULT true,
                "role" "employees_role_enum" NOT NULL DEFAULT 'user',
                "companyId" uuid,
                "created_at" TIMESTAMP DEFAULT now(),
                "updated_at" TIMESTAMP DEFAULT now(),
                CONSTRAINT "FK_employee_company" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE
            );
        `);

        // Punches
        await queryRunner.query(`
            CREATE TYPE "punches_type_enum" AS ENUM('start','exit','pause');
        `);
        await queryRunner.query(`
            CREATE TABLE "punches" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                "type" "punches_type_enum" NOT NULL,
                "timestamp" TIMESTAMP DEFAULT now(),
                "employeeId" uuid,
                CONSTRAINT "FK_punch_employee" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "punches";`);
        await queryRunner.query(`DROP TYPE "punches_type_enum";`);

        await queryRunner.query(`DROP TABLE "employees";`);
        await queryRunner.query(`DROP TYPE "employees_role_enum";`);

        await queryRunner.query(`DROP TABLE "companies";`);

        await queryRunner.query(`DROP TABLE "users";`);
        await queryRunner.query(`DROP TYPE "users_role_enum";`);
    }
}
