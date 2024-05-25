import { GetCryptoPriceService } from '../../crypto/services/get-crypto-price.service';
import { ErrorHandlerControllerDecorator } from '../../../decorators/error-handler-controller-decorator';
import { Controller } from '../../../protocols/controller';
import { DepositController } from '../controllers/deposit.controller';
import { AddBalanceService } from '../services/add-balance.service';
import { EmailService } from '../../core/services/email.service';

export const makeDepositController = (): Controller => {
  const getCryptoPriceService = new GetCryptoPriceService();
  const emailService = new EmailService();
  const addBalanceService = new AddBalanceService(getCryptoPriceService, emailService);
  const depositController = new DepositController(addBalanceService);

  return new ErrorHandlerControllerDecorator(depositController);
};
