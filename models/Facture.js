const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const Facture = sequelize.define(
  "facture",
  {
    id_facture: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true,
    },
    date_de_creation: {
      type: Sequelize.DATE,
      allowNull: false,
      comment: "null",
    },
    date_de_modification: {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "null",
    },
    adresse: {
      type: Sequelize.STRING(45),
      allowNull: false,
      comment: "null",
    },
    prix_unitaire: {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: "null",
    },
    montant: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: "null",
    },
    TVA: {
      type: Sequelize.INTEGER(2),
      allowNull: false,
      comment: "null",
      defaultValue: 19,
    },
    id_type_paiment: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "null",
      reference: {
        model: "typePaiment",
        key: "id_type",
      },
    },
    id_commande: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "null",
      reference: {
        model: "commande",
        key: "id_commande",
      },
    },
    timbre: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: "null",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "facture",
  }
);
module.exports = Facture;
