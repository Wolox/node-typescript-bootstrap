import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserModel1574858958271 implements MigrationInterface {
  public up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'User',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, generationStrategy: 'increment', isGenerated: true },
          { name: 'username', type: 'varchar' }
        ]
      })
    );
  }

  public down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('User');
  }
}
