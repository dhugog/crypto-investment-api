import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'crypto-investment',
  entities: [__dirname + '/modules/**/entities/*.{ts,js}'],
  synchronize: true,
  logging: false,
  migrations: [__dirname + '/database/migrations/**/*.{ts,js}'],
});
