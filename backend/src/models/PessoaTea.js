const { DataTypes } = require("sequelize");
const sequelize = require("../data/conn");
const Responsavel = require("./Responsavel");

const PessoaTEA = sequelize.define(
  "PessoaTEA",
  {
    idPessoaTEA: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    informacaoMedica: {
      type: DataTypes.STRING(200),
    },
    genero: {
      type: DataTypes.STRING(20),
    },
    telefoneResponsavel: {
      type: DataTypes.STRING(20),
    },
    autorizacaoTratamento: {
      type: DataTypes.FLOAT,
    },
    diagnostico: {
      type: DataTypes.STRING(100),
    },
    grauTEA: {
      type: DataTypes.STRING(20),
    },
    contatoEmergencia: {
      type: DataTypes.STRING(100),
    },
    comunicacao: {
      type: DataTypes.STRING(200),
    },
    observacao: {
      type: DataTypes.STRING(200),
    },
    idadeDiagnostico: {
      type: DataTypes.INTEGER,
    },
    medicacao: {
      type: DataTypes.STRING(200),
    },
    frequenciaUsoMedicacao: {
      type: DataTypes.STRING(150),
    },
    presenca: {
      type: DataTypes.INTEGER,
    },
    dataCadastro: {
      type: DataTypes.DATE,
    },
    pontuacaoProgressoInicial: {
      type: DataTypes.FLOAT,
    },
    pontuacaoProgressoAtual: {
      type: DataTypes.FLOAT,
    },
    tipoUsuario: {
      type: DataTypes.STRING(50),
    },
    responsavel: {
      type: DataTypes.INTEGER,
      references: {
        model: "Responsavel",
        key: "idResponsavel",
      },
    },
  },
  {
    tableName: "PessoaTEA",
    timestamps: false,
  }
);

// Definindo a associação
PessoaTEA.belongsTo(Responsavel, { foreignKey: "responsavel" });
Responsavel.hasMany(PessoaTEA, { foreignKey: "responsavel" });

module.exports = PessoaTEA;
