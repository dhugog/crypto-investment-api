import * as express from 'express';
import { makeSignUpController, makeSignInController } from './factories';

const Router = express.Router();

Router.post('/sign-up', (req, res) => makeSignUpController().handle(req, res));
Router.post('/sign-in', (req, res) => makeSignInController().handle(req, res));

export { Router as authRouter };
