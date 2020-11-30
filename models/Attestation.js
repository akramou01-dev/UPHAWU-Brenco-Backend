const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const Attestation = sequelize.define(
  "attestation",
  {
    id_attestation: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true,
    },
    date_creation: {
      type: Sequelize.DATE,
      allowNull: false,
      comment: "null",
    },
    date_modification: {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "null",
    },
    date_suppression: {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "null",
    },
    date_envoie: {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "null",
    },
    etat: {
      type: Sequelize.ENUM("en_attente", "validée", "envoyée"),
      allowNull: false,
      defaultValue: "en_attente",
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      comment: "null",
    },
    id_condidat: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "null",
      reference: {
        model: "condidat",
        key: "id_condidat",
      },
    },
    id_classe: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "null",
      reference: {
        model: "classe",
        key: "id_classe",
      },
    },
    id_template: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "null",
      reference: {
        model: "templateAttestation",
        key: "id_template",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "attestation",
  }
);
module.exports = Attestation;
