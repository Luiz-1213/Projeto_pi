const { DataTypes } = require("sequelize");
const sequelize = require("../data/conn");

const Responsavel = sequelize.define(
  "Responsavel",
  {
    idResponsavel: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    idade: {
      type: DataTypes.INTEGER,
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
    assuntoFeedback: {
      type: DataTypes.STRING(200),
    },
    descricaoFeedback: {
      type: DataTypes.STRING(200),
    },
    genero: {
      type: DataTypes.STRING(20),
    },
    parentesco: {
      type: DataTypes.STRING(50),
    },
    telefone: {
      type: DataTypes.STRING(20),
    },
    autorizacaoTratamento: {
      type: DataTypes.FLOAT,
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
    satisfacao: {
      type: DataTypes.FLOAT,
    },
    contatoEmergencia: {
      type: DataTypes.STRING(100),
    },
    dataCadastro: {
      type: DataTypes.DATE,
    },
    tipoUsuario: {
      type: DataTypes.STRING(50),
    },
  },
  {
    tableName: "Responsavel",
    timestamps: false,
  }
);

module.exports = Responsavel;
