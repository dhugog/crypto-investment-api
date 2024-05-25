import { AddBalanceService } from '../../wallet/services/add-balance.service';
import { Currency } from '../../../constants';
import { BadRequestError } from '../../../errors';
import { GetCryptoPriceService } from './get-crypto-price.service';

type SaleInput = {
  amount: number;
  currency: Currency;
  userId: number;
};

export class SaleService {
  constructor(
    private readonly addBalanceService: AddBalanceService,
    private readonly cryptoPriceService: GetCryptoPriceService,
  ) {}

  async execute({ amount, currency, userId }: SaleInput) {
    if (![Currency.BTC].includes(currency)) {
      throw new BadRequestError(`"${currency}" is not a valid crypto currency`);
    }

    const { buy } = await this.cryptoPriceService.execute({ currency });

    return this.addBalanceService.execute({
      amount: Math.round(amount * buy),
      fromCurrency: currency,
      toCurrency: Currency.BRL,
      userId,
    });
  }
}
