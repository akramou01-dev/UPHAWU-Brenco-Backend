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
    date_de_creation: {
      type: Sequelize.DATE,
      allowNull: false,
      comment: "null",
    },
    date_de_modification: {
      type: Sequelize.DATE,
      allowNull: false,
      comment: "null",
    },
    date_debut: {
      type: Sequelize.DATE,
      allowNull: false,
      comment: "null",
    },
    date_fin: {
      type: Sequelize.DATE,
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
    id_formation: {
      type: Sequelize.INTEGER.UNSIGNED,
      comment: "null",
      reference: {
        model: "formation",
        key: "id_formation",
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
