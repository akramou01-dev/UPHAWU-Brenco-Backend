const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const Condidat = sequelize.define(
  "condidat",
  {
    id_condidat: {
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
    prenom: {
      type: Sequelize.STRING(45),
      allowNull: false,
      comment: "null",
    },
    email: {
      type: Sequelize.STRING(45),
      allowNull: false,
      comment: "null",
    },
    adresse: {
      type: Sequelize.STRING(45),
      allowNull: false,
      comment: "null",
    },
    presence: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      comment: "null",
      defaultValue: true,
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
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "condidat",
  }
);
module.exports = Condidat;
