const { DataTypes } = require("sequelize");
const sequelize = require("../data/conn");
const Funcionario = require("./Funcionario");
const Responsavel = require("./Responsavel");

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
    dataEvento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    horario: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    local: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    funcionarioCadastro: {
      type: DataTypes.INTEGER,
      references: {
        model: Funcionario,
        key: "id",
      },
    },
  },
  {
    tableName: "Eventos",
    timestamps: false,
  }
);

// Definição da associação
Evento.belongsTo(Funcionario, { foreignKey: "funcionarioCadastro" });
Evento.belongsToMany(Responsavel, {
  through: {
    model: "responsavel_has_eventos",
    foreignKey: "eventos_idEvento",
  },
  as: "Responsaveis",
  timestamps: false,
  onDelete: "CASCADE",
});

Responsavel.belongsToMany(Evento, {
  through: {
    model: "responsavel_has_eventos",
    foreignKey: "responsavel_id",
  },
  as: "Eventos",
  timestamps: false,
  onDelete: "CASCADE",
});

module.exports = Evento;
