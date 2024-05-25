import { Request, Response } from 'express';
import { Controller } from '../../../protocols/controller';
import { Currency } from '../../../constants';
import { SaleService } from '../services/sale.service';

export class SaleController implements Controller {
  constructor(private readonly saleService: SaleService) {}

  async handle(req: Request, res: Response) {
    const { amount } = req.body;
    const currency = req.params.currency as Currency;

    if (!amount) {
      return res.status(400).json({ message: `Field "amount" is required` });
    }

    const transaction = await this.saleService.execute({
      amount,
      currency,
      userId: (req as any).session.userId,
    });

    return res.status(200).json(transaction);
  }
}
