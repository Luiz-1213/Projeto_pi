const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("banco_pi", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conectamos ao banco de dados!");
} catch (error) {
  console.error("Não foi possível conectar ao banco, devido:", error);
}

module.exports = sequelize;
