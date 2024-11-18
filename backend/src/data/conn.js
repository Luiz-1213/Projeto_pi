const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

try {
  sequelize.authenticate();
  console.log("Conectamos ao banco de dados!");
} catch (error) {
  console.error("Não foi possível conectar ao banco, devido:", error);
}

module.exports = sequelize;
