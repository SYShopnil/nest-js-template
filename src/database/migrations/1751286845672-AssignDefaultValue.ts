import { MigrationInterface, QueryRunner } from "typeorm";

export class AssignDefaultValue1751286845672 implements MigrationInterface {
    name = 'AssignDefaultValue1751286845672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" DROP DEFAULT`);
    }

}
