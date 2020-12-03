const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const Commande = sequelize.define(
  "commande",
  {
    id_commande: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true,
    },
    id_client: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "client",
        key: "id_client",
      },
    },
    nbr_QR_code: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: "null",
    },
    etat: {
      type: Sequelize.ENUM("en_attente", "validée"),
      allowNull: false,
      comment: "null",
      defaultValue: "en_attente",
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    tableName: "commande",
  }
);
module.exports = Commande;
