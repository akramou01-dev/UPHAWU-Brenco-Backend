const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const QRCode = sequelize.define(
  "qrcode",
  {
    id_qrcode: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true,
    },
    date_de_generation: {
      type: Sequelize.DATE,
      allowNull: false,
      comment: "null",
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
    id_attestation: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "null",
      reference: {
        model: "attestation",
        key: "id_attestation",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "qrcode",
  }
);
module.exports = QRCode;
