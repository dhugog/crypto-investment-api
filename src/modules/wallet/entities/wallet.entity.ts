import User from '../../auth/entities/user.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Transaction from './transaction.entity';
import { Currency } from '../../../constants';

@Entity()
class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({
    type: 'enum',
    enum: Currency,
  })
  currency: Currency;

  @Column({
    type: 'bigint',
    default: 0,
    transformer: {
      from: Number,
      to: Number,
    },
  })
  balance: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.wallets)
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.debitedWallet)
  debitTransactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.creditedWallet)
  creditTransactions: Transaction[];
}

export default Wallet;
