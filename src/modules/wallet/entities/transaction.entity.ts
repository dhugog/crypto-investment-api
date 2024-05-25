import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Wallet from './wallet.entity';

@Entity()
class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  debitedWalletId: number;

  @Column({ type: 'int' })
  creditedWalletId: number;

  @Column({
    type: 'bigint',
    nullable: true,
    transformer: {
      from: (value) => (value ? Number(value) : null),
      to: (value) => (value ? Number(value) : null),
    },
  })
  debitedAmount: number;

  @Column({
    type: 'bigint',
    transformer: {
      from: Number,
      to: Number,
    },
  })
  creditedAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Wallet, (wallet) => wallet.debitTransactions)
  debitedWallet: Wallet | null;

  @ManyToOne(() => Wallet, (wallet) => wallet.creditTransactions)
  creditedWallet: Wallet;
}

export default Transaction;
