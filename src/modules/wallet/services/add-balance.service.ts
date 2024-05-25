import { BadRequestError } from '../../../errors';
import { AppDataSource } from '../../../data-source';
import Wallet from '../entities/wallet.entity';
import Transaction from '../entities/transaction.entity';
import { Currency } from '../../../constants';
import { In } from 'typeorm';
import { GetCryptoPriceService } from '../../crypto/services/get-crypto-price.service';
import { EmailService } from 'src/modules/core/services/email.service';
import User from '../../auth/entities/user.entity';

type AddBalanceInput = {
  amount: number;
  fromCurrency?: Currency;
  toCurrency: Currency;
  userId: number;
};

export class AddBalanceService {
  constructor(
    private readonly getCryptoPriceService: GetCryptoPriceService,
    private readonly emailService: EmailService,
  ) {}

  async execute({ amount, fromCurrency, toCurrency, userId }: AddBalanceInput) {
    return AppDataSource.transaction(async (manager) => {
      const walletRepository = manager.getRepository(Wallet);
      const transactionRepository = manager.getRepository(Transaction);

      if (amount <= 0) {
        throw new BadRequestError('Amount must be greater than 0');
      }

      const wallets = await walletRepository.find({ where: { userId, currency: In([fromCurrency, toCurrency]) } });

      let [toWallet, fromWallet] = [
        wallets.find((wallet) => wallet.currency === toCurrency),
        wallets.find((wallet) => wallet.currency === fromCurrency),
      ];

      if (!toWallet) {
        toWallet = walletRepository.create({
          userId,
          currency: toCurrency,
          balance: 0,
        });
      }

      toWallet.balance += amount;
      toWallet = await walletRepository.save(toWallet);

      const transaction = transactionRepository.create({
        creditedWalletId: toWallet.id,
        creditedAmount: amount,
      });

      if (fromCurrency) {
        if (!fromWallet) {
          throw new BadRequestError(`Wallet with currency "${fromCurrency}" not found`);
        }

        await this.debitFromWallet(fromWallet, transaction, amount);
        fromWallet = await walletRepository.save(fromWallet);
      }

      const createdTransaction = await transactionRepository.save(transaction);

      createdTransaction.debitedWallet = fromWallet || null;
      createdTransaction.creditedWallet = toWallet;

      return createdTransaction;
    }).then(async (transaction) => {
      void this.notifyUser(userId, transaction);

      return transaction;
    });
  }

  private async debitFromWallet(wallet: Wallet, transaction: Transaction, amount: number) {
    const { buy, sell } = await this.getCryptoPriceService.execute({ currency: Currency.BTC });

    const isBuyingBtc = wallet.currency === Currency.BRL;

    const cost = Math.round(isBuyingBtc ? sell * amount : amount / buy);

    if (wallet.balance < cost) {
      throw new BadRequestError('Insufficient balance');
    }

    wallet.balance -= cost;
    transaction.debitedAmount = cost;
    transaction.debitedWalletId = wallet.id;
  }

  private async notifyUser(userId: number, transaction: Transaction) {
    try {
      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOneBy({ id: userId });

      if (!user) {
        throw new BadRequestError('User not found');
      }

      const subjectAndBody = this.getEmailNotificationSubjectAndBody(transaction);

      if (!subjectAndBody) {
        return;
      }

      const { subject, body } = subjectAndBody;

      return this.emailService.sendEmail({
        body,
        subject,
        to: user.email,
      });
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  }

  private getEmailNotificationSubjectAndBody(transaction: Transaction) {
    const SATOSHI_TO_BTC = 100000000;
    const CENTAVO_TO_REAL = 100;

    const brlFormatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    if (transaction.creditedWallet.currency === Currency.BRL && !transaction.debitedWallet) {
      return {
        subject: 'Depósito realizado com sucesso!',
        body: `Você depositou ${brlFormatter.format(transaction.creditedAmount / CENTAVO_TO_REAL)} em sua conta!`,
      };
    }

    if (transaction.creditedWallet.currency === Currency.BRL && transaction.debitedWallet?.currency === Currency.BTC) {
      return {
        subject: `Venda de bitcoins realizada com sucesso!`,
        body: `Você vendeu ${transaction.debitedAmount / SATOSHI_TO_BTC} BTC pelo valor de ${brlFormatter.format(transaction.creditedAmount / CENTAVO_TO_REAL)}!`,
      };
    }

    if (transaction.creditedWallet.currency === Currency.BTC && transaction.debitedWallet?.currency === Currency.BRL) {
      return {
        subject: `Compra de bitcoins realizada com sucesso!`,
        body: `Você comprou ${transaction.creditedAmount / SATOSHI_TO_BTC} BTC pelo valor de ${brlFormatter.format(transaction.debitedAmount / CENTAVO_TO_REAL)}!`,
      };
    }

    return;
  }
}
