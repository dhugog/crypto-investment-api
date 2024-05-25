import { ErrorHandlerControllerDecorator } from '../../../decorators/error-handler-controller-decorator';
import { Controller } from '../../../protocols/controller';
import { GetTransactionsService } from '../services/get-transactions.service';
import { GetTransactionsController } from '../controllers/get-transactions.controller';

export const makeGetTransactionsController = (): Controller => {
  const getTransactionsService = new GetTransactionsService();
  const getTransactionsController = new GetTransactionsController(getTransactionsService);

  return new ErrorHandlerControllerDecorator(getTransactionsController);
};
