import express from 'express';
import { AppDataSource } from './data-source';
import { authRouter } from './modules/auth/auth.routes';
import { authMiddleware } from './middlewares';
import redisClient from './redis-client';
import { cryptoRouter } from './modules/crypto/crypto.routes';
import { walletRouter } from './modules/wallet/wallet.routes';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.use('/auth', authRouter);
app.use('/', authMiddleware, walletRouter);
app.use('/crypto', authMiddleware, cryptoRouter);

const { PORT = 3000 } = process.env;

AppDataSource.initialize()
  .then(async (connection) => {
    await connection.synchronize();

    console.log('Data Source has been initialized');

    app.listen(PORT, () => {
      console.log(`Express is listening at http://localhost:${PORT}`);
    });
  })
  .catch(console.error);

redisClient
  .connect()
  .then(() => {
    console.log('Redis connection established');
  })
  .catch((error) => {
    console.error('Redis connection failed', error);
  });
