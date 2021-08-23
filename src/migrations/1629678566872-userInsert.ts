import {MigrationInterface, QueryRunner} from "typeorm";

export class userInsert1629678566872 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       
        await queryRunner.query(
            `insert into "user"
            (
                "email",
                "password",
                "created_at",
                "updated_at"
            )values
            (
                'admin@admin.com',
                '$2b$08$qJoG.dAP9upgn/jCVJg9XujhLQf/ZZBas3rUvN2oJ1kKgpdbhvATy',
                'now()',
                'now()'
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`delete from "user" where email ='andre.orcl.dba@gmail.com'`);
    }
}