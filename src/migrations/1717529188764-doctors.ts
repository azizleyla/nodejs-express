import { MigrationInterface, QueryRunner } from "typeorm";

export class Doctors1717529188764 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    `CREATE TABLE "doctors"  (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "firstname" character varying NOT NULL,
            "lastname" character varying NOT NULL,
            "gender" character varying NOT NULL,
            "email" character varying NOT NULL,
            "img_path" character varying,
            "bio" text,
            "position" character varying NOT NULL,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            PRIMARY KEY ("id")
          )`;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
