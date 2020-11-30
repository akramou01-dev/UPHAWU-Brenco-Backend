const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
// extracting database configuration from config.json
const config = require("./config.json")[env];

// database creation
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: config.logging,
  }
);

module.exports = sequelize;
