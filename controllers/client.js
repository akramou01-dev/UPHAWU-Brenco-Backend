const Client = require("../models/Client");
const Signataire = require("../models/Signataire");
const Admin = require("../models/Admin");
const Theme = require("../models/Theme");
const CompagneSignataire = require("../models/CompagneSignataire");
const Compagne = require("../models/Compagne");

const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: `${process.env.NODEMAILER_KEY}`,
    },
  })
);
const error_handler = (err, next) => {
  if (!err.status_code) {
    err.status_code = 500;
  }
  next(err);
};

exports.create_signataire = (req, res, next) => {
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const email = req.body.email;
  const adresse = req.body.adresse;
  const pseudo = req.body.pseudo;
  const mot_de_passe = req.body.mot_de_passe;
  const info_client = req.body.client;
  const image = req.files ? req.files[0] : null;
  const [nom_client, prenom_client] = info_client.split(" ");

  let client, new_signataire;
  // verifying validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.status_code = 402;
    throw error;
  }
  // checking if the client existe
  Client.findOne({ where: { nom: nom_client } })
    .then((fetched_client) => {
      if (!fetched_client) {
        const error = new Error("Client n'existe pas.");
        error.status_code = 404;
        throw error;
      }
      client = fetched_client.dataValues;

      // checking if the email existe in :

      // admin table
      return Admin.findOne({ where: { email: email } });
    })
    .then((admin) => {
      if (admin) {
        const error = new Error("Email existe deja.");
        error.status_code = 402;
        throw error;
      }
      //client table
      return Client.findOne({ where: { email: email } });
    })
    .then((client) => {
      if (client) {
        const error = new Error("Email existe deja.");
        error.status_code = 500;
        throw error;
      }
      // signataire table
      return Signataire.findOne({ where: { email: email } });
    })
    .then((signataire) => {
      if (signataire) {
        const error = new Error("Email existe deja.");
        error.status_code = 500;
        throw error;
      }
      // checking if the username existe in :
      // admin table
      return Admin.findOne({ where: { pseudo: pseudo } });
    })
    .then((admin) => {
      if (admin) {
        const error = new Error("Pseudo existe deja.");
        error.status_code = 403;
        throw error;
      }
      // client table
      return Client.findOne({ where: { pseudo: pseudo } });
    })
    .then((client) => {
      if (client) {
        const error = new Error("Pseudo existe deja.");
        error.status_code = 403;
        throw error;
      }
      // signataire table
      return Signataire.findOne({ where: { pseudo: pseudo } });
    })
    .then((signataire) => {
      if (signataire) {
        const error = new Error("Pseudo existe deja.");
        error.status_code = 403;
        throw error;
      }
      // hashing the password
      return bcrypt.hash(mot_de_passe, 12);
    })
    .then((hashed_password) => {
      // creating new instance
      const new_signataire = new Signataire({
        nom: nom,
        prenom: prenom,
        email: email,
        mot_de_passe: hashed_password,
        pseudo: pseudo,
        adresse: adresse,
        id_client: client.id_client,
        url_photo: image.path || null,
      });
      // saving the new instance
      return new_signataire.save();
    })
    .then((saved_signataire) => {
      new_signataire = saved_signataire;
      // notify the client via the email
      return transporter.sendMail({
        to: saved_signataire.email,
        // remplacing my email with the Brenco's one
        from: "akram.ouardas1@gmail.com",
        subject: "Creation d'un compte UPHAWU",
        html: `
                <h1>Bienvenue dans UPHAWU</h1>
                <h2> le client sous le nom de ${client.nom} ${client.prenom} vous a ajouter a ses signataire.</h2>
                <h4>Veuillez valider votre email en cliquant sur ce <a href="testing">lien</a></h4>
                  `,
      });
    })
    .then((result) => {
      // sending response
      res.status(200).json({
        new_signaire: new_signataire,
      });
    })
    .catch((err) => error_handler(err, next));
};

exports.create_compagne = async (req, res, next) => {
  // const id_client = req.user_id;
  const id_client = 1;
  const titre_compagne = req.body.titre_compagne;
  const description = req.body.description;
  const titre_theme = req.body.titre_theme;
  const id_template = req.body.id_template;
  // const signataires = req.body.signataires; //array of signataires names
  try {
    // validation errors handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.status_code = 402;
      error.data = errors.array();
      throw error;
    }
    // checking if the client existe
    const client = await Client.findByPk(id_client);
    if (!client) {
      const error = new Error("Client n'existe pas.");
      error.status_code = 404;
      throw error;
    }
    // cheking if the theme existe
    const theme = await Theme.findOne({ where: { titre: titre_theme } });
    if (!theme) {
      const error = new Error("Le theme n'existe pas.");
      error.status_code = 404;
      throw error;
    }
    const compagne = await Compagne.findOne({
      where: { titre: titre_compagne },
    });
    if (compagne) {
      const error = new Error("La compagne existe deja.");
      error.status_code = 404;
      throw error;
    }
    // creating new instance
    const new_compagne = new Compagne({
      titre: titre_compagne,
      date_de_creation: new Date(),
      description: description,
      id_template_attestation: id_template,
      id_theme: theme.dataValues.id_theme,
      id_client: id_client,
    });
    // saving the new instance
    const savec_compagne = await new_compagne.save();
    // sending the response
    await res.status(200).json({
      compagne: savec_compagne,
    });
  } catch (err) {
    error_handler(err, next);
  }
};

exports.create_theme = (req, res, next) => {
  const titre = req.body.titre;
  //   const id_client= req.user_id; // we must get it after validating auth and extracting data from the token
  const id_client = 1;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.status_code = 402;
    error.data = errors.array();
    throw error;
  }

  Client.findByPk(id_client)
    .then((client) => {
      if (!client) {
        const error = new Error("Client n'existe pas.");
        error.status_code = 404;
        throw error;
      }
      return Theme.findOne({ where: { titre: titre, id_client: id_client } });
    })
    .then((theme) => {
      if (theme) {
        const error = new Error("Le theme existe deja.");
        error.status_code = 402;
        throw error;
      }
      const new_theme = new Theme({
        titre: titre,
        id_client: id_client,
      });
      return new_theme.save();
    })
    .then((saved_theme) => {
      res.status(200).json({
        theme: saved_theme,
      });
    })
    .catch((err) => error_handler(err, next));
};

exports.signataire = (req, res, next) => {
  const id_signataire = req.params.id_signataire;
  Signataire.findByPk(id_signataire)
    .then((signataire) => {
      if (!signataire) {
        const error = new Error("Ce signataire n'existe pas.");
        error.status_code = 404;
        throw error;
      }
      return res.status(200).json({ signataire: signataire });
    })
    .catch((err) => error_handler(err, next));
};

exports.signataires = async (req, res, next) => {
  /**il faut extracter le id_client du client pour retourner que les signataire du cient qui est connecter
   * const id_client = req.id_client (extracting the data from the token ) */

  try {
    const signataires = await Signataire.findAll();
    await res.status(200).json({ signataires: signataires });
  } catch (err) {
    error_handler(err, next);
  }
};
exports.themes = (req, res, next) => {
  // const id_client = req.user_id;
  const id_client = 1;
  Theme.findAll({ where: { id_client: id_client } })
    .then((themes) => {
      if (!themes) {
        const error = new Error("Une erreur s'est produite.");
        error.status_code = 500;
        throw error;
      }
      return res.status(200).json({
        themes: themes,
      });
    })
    .catch((err) => error_handler(err, next));
};

exports.update_signataire = async (req, res, next) => {
  const id_signataire = req.params.id_signataire;
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const email = req.body.email;
  const adresse = req.body.adresse;
  const pseudo = req.body.pseudo;
  const mot_de_passe = req.body.mot_de_passe;
  const client = req.body.client;
  const [nom_client, prenom_client] = client.split(" ");
  (email_existe = false), (pseudo_existe = false);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.status_code = 402;
      throw error;
    }
    const fetched_signataire = await Signataire.findByPk(id_signataire);
    if (!fetched_signataire) {
      const error = new Error("Le signataire n'existe pas.");
      error.status_code = 404;
      throw error;
    }
    // updating the email
    if (fetched_signataire.email !== email) {
      // chking if the email existe
      // cheking in the admin table
      const admin_emails = await Admin.findOne({ where: { email: email } });
      if (admin_emails) {
        email_existe = true;
      } else {
        // cheking in the client table
        const client_emails = await Client.findOne({ where: { email: email } });
        if (client_emails && !email_existe) {
          email_existe = true;
        } else if (!email_existe) {
          const signataire_emails = await Signataire.findOne({
            where: { email: email },
          });
          if (signataire_emails) {
            email_existe = true;
          }
        }
      }
      if (email_existe) {
        const error = new Error("L'email existe deja.");
        error.status_code = 402;
        throw error;
      } else {
        fetched_signataire.email = email;
      }
    }
    if (fetched_signataire.pseudo !== pseudo) {
      // cheking if the username existe
      const admin_pseudo = await Admin.findOne({ where: { pseudo: pseudo } });
      if (admin_pseudo) {
        pseudo_existe = true;
      } else {
        const client_pseudo = await Client.findOne({
          where: { pseudo: pseudo },
        });
        if (client_pseudo && !pseudo_existe) {
          pseudo_existe = true;
        } else if (!pseudo_existe) {
          const signataire_pseudo = await Signataire.findOne({
            where: { pseudo: pseudo },
          });
          if (signataire_pseudo) {
            pseudo_existe = true;
          }
        }
      }
      if (pseudo_existe) {
        const error = new Error("Le pseudo existe deja.");
        error.status_code = 402;
        throw error;
      } else {
        fetched_signataire.pseudo = pseudo;
      }
    }
    const password_matches = await bcrypt.compare(
      mot_de_passe,
      fetched_signataire.mot_de_passe
    );
    if (!password_matches) {
      const new_password = await bcrypt.hash(mot_de_passe, 12);
      fetched_signataire.mot_de_passe = new_password;
    }
    // cheking if the etablissment existe
    const client = await Client.findOne({
      where: { nom: nom_client, prenom: prenom_client },
    });
    if (!client) {
      const error = new Error("Le client n'existe pas.");
      error.status_code = 404;
      throw error;
    }
    fetched_signataire.id_client = client.dataValues.id_client;
    fetched_signataire.nom = nom;
    fetched_signataire.prenom = prenom;
    fetched_signataire.adresse = adresse;
    const saved_signataire = await fetched_signataire.save();
    res.status(200).json({
      updated_signataire: saved_signataire,
    });
  } catch (err) {
    error_handler(err, next);
  }
};

// // setting the signataires in the CompagneSignataire table
// signataires.forEach(async (signataire) => {
//   // cheking if the signataire existe
//   const fetched_signataire = await Signataire.findOne({
//     where: { nom: signataire },
//   });
//   if (!fetched_signataire) {
//     const error = new Error(`Le signataire ${signataire} n'existe pas.`);
//     error.status_code = 404;
//     throw error;
//   }
//   // chaking if the signataire beongs to this client
//   if (fetched_signataire.dataValues.id_client !== id_client) {
//     const error = new Error(
//       `Le signataire ${signataire} n'est pas un signataire du client sous le nom ${client.dataValues.nom} ${client.dataValues.perenom}`
//     );
//     error.status_code = 404;
//     throw error;
//   }
//   // creating new instance of the CompagneSignataire relations
//   const new_relation = new CompagneSignataire({
//     id_signataire: fetched_signataire.dataValues.id_signataire,
//     id_compagne: savec_compagne.id_compagne,
//   });
//   // saving the instance
//   const saved_relation = new_relation.save();
// });
