const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const CondidatClasse = sequelize.define(
  "condidatClasse",
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true,
    },
    id_condidat: {
      type: Sequelize.INTEGER.UNSIGNED,
      comment: "null",
      reference: {
        model: "condidat",
        key: "id_condidat",
      },
    },
    id_classe: {
      type: Sequelize.INTEGER.UNSIGNED,
      comment: "null",
      reference: {
        model: "classe",
        key: "id_classe",
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    tableName: "classeCondidat",
  }
);
module.exports = CondidatClasse;
