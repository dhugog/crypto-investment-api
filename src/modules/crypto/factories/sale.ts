import { AddBalanceService } from '../../wallet/services/add-balance.service';
import { ErrorHandlerControllerDecorator } from '../../../decorators/error-handler-controller-decorator';
import { Controller } from '../../../protocols/controller';
import { GetCryptoPriceService } from '../services/get-crypto-price.service';
import { SaleService } from '../services/sale.service';
import { SaleController } from '../controllers/sale.controller';
import { EmailService } from '../../core/services/email.service';

export const makeSaleController = (): Controller => {
  const getCryptoPriceService = new GetCryptoPriceService();
  const emailService = new EmailService();
  const addBalanceService = new AddBalanceService(getCryptoPriceService, emailService);
  const saleService = new SaleService(addBalanceService, getCryptoPriceService);
  const saleController = new SaleController(saleService);

  return new ErrorHandlerControllerDecorator(saleController);
};
