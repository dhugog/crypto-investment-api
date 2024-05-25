import { AppDataSource } from '../../../data-source';
import Transaction from '../entities/transaction.entity';
import Wallet from '../entities/wallet.entity';
import { In, IsNull, LessThanOrEqual, MoreThanOrEqual, Or } from 'typeorm';

type GetTransactionsInput = {
  userId: number;
  fromDate?: Date;
  toDate?: Date;
};

export class GetTransactionsService {
  async execute({ userId, fromDate, toDate }: GetTransactionsInput) {
    const transactionRepository = AppDataSource.getRepository(Transaction);
    const walletRepository = AppDataSource.getRepository(Wallet);

    const wallets = await walletRepository.find({ where: { userId } });
    const walletIds = wallets.map((wallet) => wallet.id);

    return transactionRepository.find({
      where: {
        debitedWalletId: Or(In(walletIds), IsNull()),
        creditedWalletId: In(walletIds),
        ...(fromDate && { createdAt: MoreThanOrEqual(fromDate) }),
        ...(toDate && { createdAt: LessThanOrEqual(toDate) }),
      },
    });
  }
}
