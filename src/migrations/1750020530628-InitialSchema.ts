import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1750020530628 implements MigrationInterface {
    name = 'InitialSchema1750020530628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('OPEN', 'IN_PROGRESS', 'DONE')`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."task_status_enum" NOT NULL DEFAULT 'OPEN', "projectId" uuid, "createdById" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "ownerId" uuid, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_assignees" ("user_id" uuid NOT NULL, "task_id" uuid NOT NULL, CONSTRAINT "PK_7ae8012667c1cc4ca8266002afc" PRIMARY KEY ("user_id", "task_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bb8051e376a2b083e074678cb6" ON "task_assignees" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0141288f2306f20da9a60ec8d6" ON "task_assignees" ("task_id") `);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_91d76dd2ae372b9b7dfb6bf3fd2" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_assignees" ADD CONSTRAINT "FK_bb8051e376a2b083e074678cb60" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_assignees" ADD CONSTRAINT "FK_0141288f2306f20da9a60ec8d69" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_assignees" DROP CONSTRAINT "FK_0141288f2306f20da9a60ec8d69"`);
        await queryRunner.query(`ALTER TABLE "task_assignees" DROP CONSTRAINT "FK_bb8051e376a2b083e074678cb60"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_91d76dd2ae372b9b7dfb6bf3fd2"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0141288f2306f20da9a60ec8d6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bb8051e376a2b083e074678cb6"`);
        await queryRunner.query(`DROP TABLE "task_assignees"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
    }

}
