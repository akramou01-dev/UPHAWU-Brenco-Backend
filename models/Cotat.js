const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const Cotat = sequelize.define(
  "cotat",
  {
    id_cotat: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true,
    },
    id_client: {
      type: Sequelize.INTEGER.UNSIGNED,
      comment: "null",
      reference: {
        model: "client",
        key: "id_client",
      },
    },
    id_signataire: {
      type: Sequelize.INTEGER.UNSIGNED,
      comment: "null",
      reference: {
        model: "signataire",
        key: "id_signataire",
      },
    },
    nbr_QR_code: {
      type: Sequelize.INTEGER(2),
      allowNull: false,
      comment: "null",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "cotat",
  }
);
module.exports = Cotat;
