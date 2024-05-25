import { SignUpService } from '../services/sign-up.service';
import { SignUpController } from '../controllers/sign-up.controller';
import { ErrorHandlerControllerDecorator } from '../../../decorators/error-handler-controller-decorator';
import { Controller } from '../../../protocols/controller';

export const makeSignUpController = (): Controller => {
  const signUpService = new SignUpService();
  const signUpController = new SignUpController(signUpService);

  return new ErrorHandlerControllerDecorator(signUpController);
};
