const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const Compagne = sequelize.define(
  "compagne",
  {
    id_compagne: {
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
    tableName: "compagne",
  }
);
module.exports = Compagne;
