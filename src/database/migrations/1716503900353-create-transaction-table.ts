import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTransactionTable1716503900353 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transaction',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'debitedWalletId',
            type: 'int',
          },
          {
            name: 'creditedWalletId',
            type: 'int',
          },
          {
            name: 'debitedAmount',
            type: 'bigint',
          },
          {
            name: 'creditedAmount',
            type: 'bigint',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'transaction',
      new TableForeignKey({
        columnNames: ['debitedWalletId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'wallet',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transaction',
      new TableForeignKey({
        columnNames: ['creditedWalletId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'wallet',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transaction');
  }
}
