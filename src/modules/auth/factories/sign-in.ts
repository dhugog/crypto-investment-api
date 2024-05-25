import { ErrorHandlerControllerDecorator } from '../../../decorators/error-handler-controller-decorator';
import { SignInService } from '../services/sign-in.service';
import { SignInController } from '../controllers/sign-in.controller';
import { Controller } from '../../../protocols/controller';

export const makeSignInController = (): Controller => {
  const signInService = new SignInService();
  const signInController = new SignInController(signInService);

  return new ErrorHandlerControllerDecorator(signInController);
};
