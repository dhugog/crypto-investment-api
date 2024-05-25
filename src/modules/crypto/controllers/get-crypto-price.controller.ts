import { Request, Response } from 'express';
import { Controller } from '../../../protocols/controller';
import { GetCryptoPriceService } from '../services/get-crypto-price.service';
import { Currency } from '../../../constants';

export class GetCryptoPriceController implements Controller {
  constructor(private readonly getCryptoPriceService: GetCryptoPriceService) {}

  async handle(req: Request, res: Response) {
    const cryptoPrice = await this.getCryptoPriceService.execute({ currency: req.params.currency as Currency });

    return res.status(200).json(cryptoPrice);
  }
}
