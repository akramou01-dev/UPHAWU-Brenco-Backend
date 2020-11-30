const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const TypePaiment = sequelize.define(
  "typePaiment",
  {
    id_type: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true,
    },
    nom: {
      type: Sequelize.STRING(45),
      allowNull: false,
      comment: "null",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "typePaiment",
  }
);
module.exports = TypePaiment;
