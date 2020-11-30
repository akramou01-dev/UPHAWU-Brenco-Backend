const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const Offre = sequelize.define(
  "offre",
  {
    id_offre: {
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
    nbr_QR_code: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: "null",
    },
    date_debut_utilisation: {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "null",
    },
    durée: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "offre",
  }
);
module.exports = Offre;
