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
    cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
    },
    endereco: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    dataNascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    genero: {
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
PessoaTEA.belongsTo(Responsavel, { foreignKey: "id", as: "Eesponsavel" });
Responsavel.hasMany(PessoaTEA, { foreignKey: "responsavel", as: "PessoaTEA" });

module.exports = PessoaTEA;
