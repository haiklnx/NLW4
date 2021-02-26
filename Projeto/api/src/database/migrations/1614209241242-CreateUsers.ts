import { MigrationInterface, QueryRunner, Table } from "typeorm";

// migration criada utilizando 
// yarn typeorm migration:create -n CreateUsers
export class CreateUsers1614209241242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Padrão de criação de tabelas
        // yarn typeorm migration:run
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ]
            })
        );
    }

    //Desfaz a migration
    //yarn typeorm migration:revert
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
