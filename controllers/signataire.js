const Compagne = require("../models/Compagne");
const Classe = require("../models/Classe");
const { validationResult } = require("express-validator");
const Client = require("../models/Client");
const error_handler = (err, next) => {
  if (!err.status_code) {
    err.status_code = 500;
  }
  next(err);
};

const create_and_throw_error = (err_message, err_status_code, data) => {
  const error = new Error(err_message);
  error.status_code = err_status_code;
  if (data) {
    error.data = data;
  }
  throw error;
};

exports.create_classe = async (req, res, next) => {
  // const id_signataire = req.user_id;
  const id_signataire = 1; // for testing before implementing the AUTH
  const date_debut = req.body.date_debut;
  const date_fin = req.body.date_fin;
  const titre_compagne = req.body.titre_compagne;
  const nom_classe = req.body.nom;
  try {
    // cheking for the validation request fields errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      create_and_throw_error(errors.array()[0].msg, 402, errors.array());
    }
    // Validating the dates
    const date = new Date();
    const current_date_format = `${date.getFullYear()}-${
      date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    }-${date.getDay() < 10 ? "0" + date.getDate() : date.getDate()}`;

    if (date_debut < current_date_format) {
      create_and_throw_error("Date debut doit étre dans le future.", 402);
    }

    if (date_debut > date_fin) {
      create_and_throw_error(
        "Date fin doit etre supperieur a date debut.",
        402
      );
    }

    // cheking if the compagne existe;
    const compagne = await Compagne.findOne({
      where: { titre: titre_compagne },
    });
    if (!compagne) {
      create_and_throw_error("La compagne n'existe pas.", 404);
    }
    // cheking if the class existe
    const client = await Client.findOne({
      where: { id_signataire: id_signataire },
    });
    if (!client) {
      create_and_throw_error(
        "Le client n'existe pas pour le signataire connecter.",
        404
      );
    }
    const classe_existe = await Classe.findOne({
      where: {
        nom: nom_classe,
        id_client: client.dataValues.id_client,
        date_debut: date_debut,
        date_fin: date_fin,
        id_signataire: id_signataire,
        id_compagne: compagne.dataValues.id_compagne,
      },
    });
    if (classe_existe) {
      create_and_throw_error("La classe existe deja.", 402);
    }
    // creating the new instance
    const new_classe = new Classe({
      nom: nom_classe,
      date_debut: date_debut,
      date_fin: date_fin,
      id_signataire: id_signataire,
      id_compagne: compagne.dataValues.id_compagne,
      date_de_creation: date,
    });
    // saving the new instance
    const saved_classe = await new_classe.save();
    console.log(saved_classe);
    const test = await Classe.findOne({ where: { nom: nom_classe } });
    res.status(200).json({
      new_classe: saved_classe,
    });
  } catch (err) {
    error_handler(err, next);
  }
};

exports.classes = (req, res, next) => {
  // extracting the current user_id from the token
  //   const id_signataire = req.user_id;
  const id_signataire = 1;
  Classe.findAll({ where: { id_signataire: id_signataire } })
    .then(async (classes) => {
      if (!classes) {
        create_and_throw_error(
          "Une erreur s'est produite lors de la récupération des données.",
          500
        );
      }
      res.status(200).json({
        classes: classes,
      });
    })
    .catch((err) => error_handler(err, next));
};
