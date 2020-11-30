const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const TemplateAttestation = sequelize.define(
  "templateAttestation",
  {
    id_template: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true,
    },
    url_template: {
      type: Sequelize.STRING(45),
      allowNull: false,
      comment: "null",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "templateAttestation",
  }
);
module.exports = TemplateAttestation;
