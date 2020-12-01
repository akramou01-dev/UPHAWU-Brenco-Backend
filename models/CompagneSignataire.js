const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const CompagneSignataire = sequelize.define(
  "compagneSignataire",
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true,
    },
    id_sigantaire: {
      type: Sequelize.INTEGER.UNSIGNED,
      comment: "null",
      reference: {
        model: "sigantaire",
        key: "id_signataire",
      },
    },
    id_compagne: {
      type: Sequelize.INTEGER.UNSIGNED,
      comment: "null",
      reference: {
        model: "compagne",
        key: "id_compagne",
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    tableName: "compagneSignataire",
  }
);
module.exports = CompagneSignataire;
