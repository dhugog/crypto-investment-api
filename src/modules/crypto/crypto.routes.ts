import * as express from 'express';
import { makeGetCryptoPriceController, makePurchaseController, makeSaleController } from './factories';

const Router = express.Router();

Router.get('/:currency/price', (req, res) => makeGetCryptoPriceController().handle(req, res));
Router.post('/:currency/buy', (req, res) => makePurchaseController().handle(req, res));
Router.post('/:currency/sell', (req, res) => makeSaleController().handle(req, res));

export { Router as cryptoRouter };
