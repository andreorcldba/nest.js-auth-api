import {MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey } from "typeorm";

export class user1629651190458 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "serial",
                    isPrimary: true
                },
                {
                    name: "email",
                    type: "varchar(255)",
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: "password",
                    type: "varchar(255)",
                    isNullable: false,
                },
                {
                    name: "remember_token",
                    type: "varchar(255)",
                    isNullable: true,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    isNullable: false,
                    default: 'now()'
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    isNullable: false,
                    default: 'now()'
                },
            ]
        }), true)
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }
}