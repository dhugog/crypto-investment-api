import { AddBalanceService } from '../../wallet/services/add-balance.service';
import { Currency } from '../../../constants';
import { BadRequestError } from '../../../errors';

type PurchaseInput = {
  amount: number;
  currency: Currency;
  userId: number;
};

export class PurchaseService {
  constructor(private readonly addBalanceService: AddBalanceService) {}

  async execute({ amount, currency, userId }: PurchaseInput) {
    if (![Currency.BTC].includes(currency)) {
      throw new BadRequestError(`"${currency}" is not a valid crypto currency`);
    }

    return this.addBalanceService.execute({
      amount,
      fromCurrency: Currency.BRL,
      toCurrency: currency,
      userId,
    });
  }
}
