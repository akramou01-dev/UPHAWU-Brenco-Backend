const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const Theme = sequelize.define(
  "theme",
  {
    id_theme: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true,
    },
    titre: {
      type: Sequelize.STRING(45),
      allowNull: false,
      comment: "null",
    },
    id_signataire: {
      type: Sequelize.INTEGER.UNSIGNED,
      comment: "null",
      reference: {
        model: "signataire",
        key: "id_signataire",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "theme",
  }
);
module.exports = Theme;
