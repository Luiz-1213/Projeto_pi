const { DataTypes } = require("sequelize");
const sequelize = require("../data/conn");

const Responsavel = sequelize.define(
  "Responsavel",
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
    },
    endereco: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING(20),
    },
    telefone: {
      type: DataTypes.STRING(20),
    },
    observacao: {
      type: DataTypes.STRING(200),
    },
    horarioDisponivel: {
      type: DataTypes.STRING(100),
    },
    dataNascimento: {
      type: DataTypes.DATE,
    },
    contatoEmergencia: {
      type: DataTypes.STRING(100),
    },
    tipoUsuario: {
      type: DataTypes.ENUM("responsavel"),
      allowNull: false,
    },
    ativo: {
      type: DataTypes.TINYINT, // Adicionando o campo 'ativo'
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    tableName: "Responsavel",
    timestamps: true,
  }
);

module.exports = Responsavel;
