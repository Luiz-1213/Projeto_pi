const { DataTypes } = require("sequelize");
const sequelize = require("../data/conn");
const Responsavel = require("./Responsavel");

const Feedback = sequelize.define(
  "Feedback",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    assuntoFeedback: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    descricaoFeedback: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    satisfacao: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    responsavelId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Responsavel",
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    tableName: "Feedback",
    timestamps: false,
  }
);

// Definindo a associação
Feedback.belongsTo(Responsavel, { foreignKey: "responsavelId" });
Responsavel.hasMany(Feedback, { foreignKey: "responsavelId" });

module.exports = Feedback;
