import { AddBalanceService } from '../../wallet/services/add-balance.service';
import { ErrorHandlerControllerDecorator } from '../../../decorators/error-handler-controller-decorator';
import { Controller } from '../../../protocols/controller';
import { PurchaseController } from '../controllers/purchase.controller';
import { PurchaseService } from '../services/purchase.service';
import { GetCryptoPriceService } from '../services/get-crypto-price.service';
import { EmailService } from '../../core/services/email.service';

export const makePurchaseController = (): Controller => {
  const getCryptoPriceService = new GetCryptoPriceService();
  const emailService = new EmailService();
  const addBalanceService = new AddBalanceService(getCryptoPriceService, emailService);
  const purchaseService = new PurchaseService(addBalanceService);
  const purchaseController = new PurchaseController(purchaseService);

  return new ErrorHandlerControllerDecorator(purchaseController);
};
