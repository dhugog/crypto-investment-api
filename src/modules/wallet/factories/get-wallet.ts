import { ErrorHandlerControllerDecorator } from '../../../decorators/error-handler-controller-decorator';
import { Controller } from '../../../protocols/controller';
import { GetWalletService } from '../services/get-wallet.service';
import { GetWalletController } from '../controllers/get-wallet.controller';

export const makeGetWalletController = (): Controller => {
  const getWalletService = new GetWalletService();
  const getWalletController = new GetWalletController(getWalletService);

  return new ErrorHandlerControllerDecorator(getWalletController);
};
