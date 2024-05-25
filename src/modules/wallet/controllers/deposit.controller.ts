import { Request, Response } from 'express';
import { Controller } from '../../../protocols/controller';
import { AddBalanceService } from '../services/add-balance.service';
import { Currency } from '../../../constants';

export class DepositController implements Controller {
  constructor(private readonly addBalanceService: AddBalanceService) {}

  async handle(req: Request, res: Response) {
    const { amount } = req.body;
    const currency = req.params.currency as Currency;

    if (!amount) {
      return res.status(400).json({ message: `Field "amount" is required` });
    }

    if (![Currency.BRL].includes(currency)) {
      return res.status(400).json({ message: `Invalid currency` });
    }

    const transaction = await this.addBalanceService.execute({
      amount,
      toCurrency: currency,
      userId: (req as any).session.userId,
    });

    return res.status(200).json(transaction);
  }
}
