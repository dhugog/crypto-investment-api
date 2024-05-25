import { ErrorHandlerControllerDecorator } from '../../../decorators/error-handler-controller-decorator';
import { Controller } from '../../../protocols/controller';
import { GetCryptoPriceService } from '../services/get-crypto-price.service';
import { GetCryptoPriceController } from '../controllers/get-crypto-price.controller';

export const makeGetCryptoPriceController = (): Controller => {
  const getCryptoPriceService = new GetCryptoPriceService();
  const getCryptoPriceController = new GetCryptoPriceController(getCryptoPriceService);

  return new ErrorHandlerControllerDecorator(getCryptoPriceController);
};
