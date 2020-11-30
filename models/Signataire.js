const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const Signataire = sequelize.define(
  "signataire",
  {
    id_signataire: {
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
    pseudo: {
      type: Sequelize.STRING(45),
      allowNull: true,
      comment: "null",
    },
    mot_de_passe: {
      type: Sequelize.STRING(65), // 25 for bcrypt hashing
      allowNull: true,
      comment: "null",
    },
    email: {
      type: Sequelize.STRING(30),
      allowNull: false,
      comment: "null",
    },
    etat: {
      type: Sequelize.ENUM("activé", "desactivé", "en_attente"),
      allowNull: true,
      comment: "null",
      defaultVaue: "en_attente",
    },
    derniere_connexion: {
      type: Sequelize.TIME,
      allowNull: true,
      comment: "null",
    },
    modifier_mot_de_passe_token: {
      type: Sequelize.STRING(45),
      allowNull: true,
      comment: "null",
    },
    modifier_mot_de_passe_token_expiration: {
      type: Sequelize.TIME,
      allowNull: true,
      comment: "null",
    },
    validation_email_token: {
      type: Sequelize.STRING(45),
      allowNull: true,
      comment: "null",
    },
    url_photo: {
      type: Sequelize.STRING(45),
      allowNull: true,
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
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "signataire",
  }
);
module.exports = Signataire;
