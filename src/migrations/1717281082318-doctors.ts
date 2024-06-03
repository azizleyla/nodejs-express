import { MigrationInterface, QueryRunner } from "typeorm";

export class Doctors1717276263264 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "doctors"  (
                        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                        "fullName" character varying NOT NULL,
                        "position" character varying NOT NULL,
                        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                      )  
                      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
