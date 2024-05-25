import { AppDataSource } from '../../../data-source';
import Wallet from '../entities/wallet.entity';
import { Currency } from '../../../constants';

type GetWalletInput = {
  currency: string;
  userId: number;
};

export class GetWalletService {
  async execute({ currency, userId }: GetWalletInput) {
    const walletRepository = AppDataSource.getRepository(Wallet);

    return walletRepository.findOne({ where: { userId, currency: currency as Currency } });
  }
}
