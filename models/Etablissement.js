const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const Etablissement = sequelize.define(
  "etablissement",
  {
    id_etablissement: {
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
    adresse: {
      type: Sequelize.STRING(45),
      allowNull: false,
      comment: "null",
    },
    url_logo: {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: "null",
    },
    id_offre: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "null",
      reference: {
        model: "offre",
        key: "id_offre",
      },
      defaultValue: "1",
    },
    nbr_QR_code: {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: "null",
    },
    RS: {
      type: Sequelize.STRING(45),
      allowNull: false,
      comment: "null",
    },
    NIF: {
      type: Sequelize.INTEGER(10),
      allowNull: false,
      comment: "null",
    },
    NIS: {
      type: Sequelize.STRING(45),
      allowNull: false,
      comment: "null",
    },
    NAF: {
      type: Sequelize.STRING(45),
      allowNull: false,
      comment: "null",
    },
    RC: {
      type: Sequelize.STRING(45),
      allowNull: false,
      comment: "null",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "etablissement",
  }
);
module.exports = Etablissement;
