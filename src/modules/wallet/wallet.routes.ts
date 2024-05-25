import * as express from 'express';
import { makeDepositController, makeGetTransactionsController, makeGetWalletController } from './factories';

const Router = express.Router();

Router.post('/wallet/:currency/deposit', (req, res) => makeDepositController().handle(req, res));
Router.get('/wallet/:currency', (req, res) => makeGetWalletController().handle(req, res));
Router.get('/transactions', (req, res) => makeGetTransactionsController().handle(req, res));

export { Router as walletRouter };
