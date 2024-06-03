import { MigrationInterface, QueryRunner } from "typeorm";

export class Images1717280209620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "images" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" character varying NOT NULL,
            "path" character varying NOT NULL,
            "doctorId" uuid,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "FK_doctor_id" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE
        )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
