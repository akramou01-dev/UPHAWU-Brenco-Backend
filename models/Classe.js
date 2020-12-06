const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const Classe = sequelize.define(
  "classe",
  {
    id_classe: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true,
    },
    nom: {
      type: Sequelize.STRING(45),
      allowNull: false,
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
    date_debut: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      comment: "null",
    },
    date_fin: {
      type: Sequelize.DATEONLY,
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
    id_compagne: {
      type: Sequelize.INTEGER.UNSIGNED,
      comment: "null",
      reference: {
        model: "compagne",
        key: "id_compagne",
      },
    },
    id_client: {
      type: Sequelize.INTEGER.UNSIGNED,
      comment: "null",
      reference: {
        model: "client",
        key: "id_client",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "classe",
  }
);
module.exports = Classe;
