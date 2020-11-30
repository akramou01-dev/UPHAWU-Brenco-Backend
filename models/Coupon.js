const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const Coupon = sequelize.define(
  "coupon",
  {
    id_coupon: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true,
    },
    code: {
      type: Sequelize.STRING(45),
      allowNull: false,
      comment: "null",
    },
    date_debut: {
      type: Sequelize.DATE,
      allowNull: false,
      coment: "null",
    },
    date_fin: {
      type: Sequelize.DATE,
      allowNull: false,
      comment: "null",
    },
    reduction: { // en %
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: "null",
    },
    nbr_QR_code: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: "null",
    },
    nbr_utilisation: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "coupon",
  }
);
module.exports = Coupon;
