const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Funcionario = require("./Funcionario"); // Import do modelo Funcionario

const Evento = sequelize.define(
  "Evento",
  {
    idEvento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    assunto: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    horario: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    local: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    funcionarioCadastro: {
      type: DataTypes.INTEGER,
      references: {
        model: Funcionario,
        key: "idFuncionario",
      },
    },
    dataCadastro: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "Eventos",
    timestamps: false,
  }
);

// Definição da associação
Evento.belongsTo(Funcionario, { foreignKey: "funcionarioCadastro" });

module.exports = Evento;
