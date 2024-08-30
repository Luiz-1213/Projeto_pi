const { DataTypes } = require("sequelize");
const sequelize = require("../data/conn");
const Responsavel = require("./Responsavel");

const PessoaTEA = sequelize.define(
  "PessoaTEA",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    foto: {
      type: DataTypes.STRING(200),
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
      type: DataTypes.ENUM("regular", "ausente"),
      allowNull: false,
    },
    pontuacaoProgressoInicial: {
      type: DataTypes.FLOAT,
    },
    pontuacaoProgressoAtual: {
      type: DataTypes.FLOAT,
    },
    tipoUsuario: {
      type: DataTypes.ENUM("admin", "funcionario", "responsavel", "pessoaTea"),
      allowNull: false,
    },
    responsavel: {
      type: DataTypes.INTEGER,
      references: {
        model: "Responsavel",
        key: "id",
      },
    },
  },
  {
    tableName: "PessoaTEA",
    timestamps: true,
  }
);

// Definindo a associação
PessoaTEA.belongsTo(Responsavel, { foreignKey: "responsavel" });
Responsavel.hasMany(PessoaTEA, { foreignKey: "responsavel" });

module.exports = PessoaTEA;
