import { Request, Response } from 'express';
import { Controller } from '../../../protocols/controller';
import { GetWalletService } from '../services/get-wallet.service';

export class GetWalletController implements Controller {
  constructor(private readonly getWalletService: GetWalletService) {}

  async handle(req: Request, res: Response) {
    const wallet = await this.getWalletService.execute({
      currency: req.params.currency,
      userId: (req as any).session.userId,
    });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    return res.status(200).json(wallet);
  }
}
