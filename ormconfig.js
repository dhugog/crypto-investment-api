module.exports = {
  type: "postgres",
  host: "localhost",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "crypto-investment",
  entities: ["src/domains/**/infra/typeorm/entities/*.ts"],
  // synchronize: true,
  migrations: ["src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "src/database/migrations"
  }
}
