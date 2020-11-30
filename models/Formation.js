const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const Formation = sequelize.define(
  "formation",
  {
    id_formation: {
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
    description : {
        type : Sequelize.TEXT, 
        allowNull : false, 
        comment : "null",
    },
    id_client: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "null",
      reference: {
        model: "client",
        key: "id_client",
      },
    },
    id_signataire: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "null",
      reference: {
        model: "signataire",
        key: "id_signataire",
      },
    },
    id_theme: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "null",
      reference: {
        model: "theme",
        key: "id_theme",
      },
    },
    id_template_attestation: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "null",
      reference: {
        model: "templateAttestation",
        key: "id_template_attestation",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "formation",
  }
);
module.exports = Formation;
