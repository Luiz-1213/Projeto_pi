const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../data/conn");

const Funcionario = sequelize.define(
  "Funcionario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    foto: {
      type: DataTypes.STRING(200),
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
    },
    endereco: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    telefone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    cargo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    dataNascimento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horarioTrabalho: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    qtdCadastroEvento: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    voluntario: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    tipoUsuario: {
      type: DataTypes.ENUM("administrador", "funcionario"),
      allowNull: false,
      defaultValue: "funcionario",
    },
  },
  {
    tableName: "Funcionario",
    timestamps: true,
  }
);

module.exports = Funcionario;
