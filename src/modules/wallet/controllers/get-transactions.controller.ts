import { Request, Response } from 'express';
import { Controller } from '../../../protocols/controller';
import { GetTransactionsService } from '../services/get-transactions.service';

export class GetTransactionsController implements Controller {
  constructor(private readonly getTransactionsService: GetTransactionsService) {}

  async handle(req: Request, res: Response) {
    const now = new Date();
    const { from, to } = req.query;

    const transactions = await this.getTransactionsService.execute({
      userId: (req as any).session.userId,
      fromDate: from ? new Date(from as string) : new Date(now.setDate(now.getDate() - 90)),
      ...(to && { toDate: new Date(to as string) }),
    });

    return res.status(200).json(transactions);
  }
}
