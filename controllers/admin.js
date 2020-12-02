// importing models
const Etablissement = require("../models/Etablissement");
const Client = require("../models/Client");
const Signataire = require("../models/Signataire");
const Offre = require("../models/Offre");
const Admin = require("../models/Admin");
const TypePaiment = require("../models/TypePaiment");
const Coupon = require("../models/Coupon");

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

exports.create_etablissement = (req, res, next) => {
  const nom = req.body.nom;
  const adresse = req.body.adresse;
  const RS = req.body.RS;
  const RC = req.body.RC;
  const NIS = req.body.NIS;
  const NIF = req.body.NIF;
  const NAF = req.body.NAF;
  const url_photo = req.body.url_photo;
  // we can add the offre
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // giving the first error message in error message
    const error = new Error(errors.array()[0].msg);
    error.status_code = 402;
    error.data = errors.array;
    throw error;
  }
  Etablissement.findOne({ where: { nom: nom } })
    .then((etablissement) => {
      if (etablissement) {
        const error = new Error("Etablissement deja enregistré.");
        error.status_code = 402;
        throw error;
      }
      const new_etablissement = new Etablissement({
        nom: nom,
        adresse: adresse,
        RC: RC,
        NIF: NIF,
        RS: RS,
        NIS: NIS,
        NAF: NAF,
        // adding the image (logo)
      });
      return new_etablissement.save();
    })
    .then((result) => {
      res.status(200).json({
        new_etablissement: result,
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.create_offre = (req, res, next) => {
  const nom = req.body.nom;
  const nbr_QR_code = req.body.nbr_QR_code;
  const durée = req.body.durée;
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.status_code = 500;
    error.data = errors.array();
    throw error;
  }
  Offre.findOne({ where: { nom: nom } })
    .then((offre) => {
      if (offre) {
        const error = new Error("Offre existe deja.");
        error.status_code = 500;
        throw error;
      }
      const new_offre = new Offre({
        nom: nom,
        nbr_QR_code: nbr_QR_code,
        durée: durée || null,
      });
      return new_offre.save();
    })
    .then((created_offre) => {
      res.status(200).json({
        new_offre: created_offre,
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.create_client = (req, res, next) => {
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const email = req.body.email;
  const adresse = req.body.adresse;
  const pseudo = req.body.pseudo;
  const mot_de_passe = req.body.mot_de_passe;
  const nom_etablissement = req.body.nom_etablissement;
  const image = req.files ? req.files[0] : null;
  let id_etablissement, new_client;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.status_code = 402;
    throw error;
  }
  // checking if the etablissement existe
  Etablissement.findOne({ where: { nom: nom_etablissement } })
    .then((etablissement) => {
      if (!etablissement) {
        const error = new Error("Etablissement n'existe pas.");
        error.status_code = 404;
        throw error;
      }
      id_etablissement = etablissement.dataValues.id_etablissement;

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
      const new_client = new Client({
        nom: nom,
        prenom: prenom,
        email: email,
        mot_de_passe: hashed_password,
        pseudo: pseudo,
        adresse: adresse,
        id_etablissement: id_etablissement,
        url_photo: image.path || null,
      });
      // saving the new instance
      return new_client.save();
    })
    .then((saved_client) => {
      new_client = saved_client;
      // notify the client via the email
      return transporter.sendMail({
        to: saved_client.email,
        // remplacing my email with the Brenco's one
        from: "akram.ouardas1@gmail.com",
        subject: "Creation d'un compte UPHAWU",
        html: `
              <h1>Bienvenue dans UPHAWU</h1>
              <h4>Veuillez valider votre email en cliquant sur ce <a href="testing">lien</a></h4>
                `,
      });
    })
    .then((result) => {
      // sending response
      res.status(200).json({
        new_client: new_client,
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.create_type_paiment = (req, res, next) => {
  const nom = req.body.nom;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.status_code = 402;
    error.data = errors.array();
    throw error;
  }

  // cheking if the type existe
  TypePaiment.findOne({ where: { nom: nom } })
    .then((type) => {
      if (type) {
        const error = new Error("Ce type existe deja");
        error.status_code = 402;
        throw error;
      }
      // creating new instance
      const new_type = new TypePaiment({ nom: nom });
      return new_type.save();
    })
    .then((saved_type) => {
      // sending response
      res.status(200).json({
        new_type: saved_type,
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.create_coupon = (req, res, next) => {
  const code = req.body.code;
  const date_debut = req.body.date_debut;
  const date_fin = req.body.date_fin;
  const reduction = req.body.reduction;
  const nbr_QR_code = req.body.nbr_QR_code;
  const nbr_utilisation = req.body.nbr_utilisation;
  // handling validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.status_code = 402;
    error.data = errors.array();
    throw error;
  }

  const date = new Date();
  // checking if the dates are valide
  const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
  if (`${date.getFullYear()}-${month}-${date.getDate()}` > date_debut) {
    const error = new Error("Date debut doit étre dans le future.");
    error.statusCode = 500;
    throw error;
  }
  if (date_debut > date_fin) {
    const error = new Error("Date debut superieur a date fin du coupon");
    error.statusCode = 500;
    throw error;
  }
  Coupon.findOne({
    where: { code: code, date_debut: date_debut, date_fin: date_fin },
  })
    .then((coupon) => {
      if (coupon) {
        const error = new Error("Le coupon existe deja.");
        error.status_code = 500;
        throw error;
      }
      // cerating instance
      const new_coupon = new Coupon({
        code: code,
        date_debut: date_debut,
        date_fin: date_fin,
        nbr_QR_code: nbr_QR_code,
        nbr_utilisation: nbr_utilisation,
        reduction: reduction,
      });
      // saving the instance
      return new_coupon.save();
    })
    .then((saved_coupon) => {
      res.status(200).json({
        new_coupon: saved_coupon,
      });
    })
    .catch((err) => error_handler(err, next));
};

exports.etablissement = (req, res, next) => {
  const id_etablissement = req.params.id_etablissement;
  Etablissement.findByPk(id_etablissement)
    .then((etablissement) => {
      if (!etablissement) {
        const error = new Error("Cet etablissement n'existe pas.");
        error.status_code = 404;
        throw error;
      }
      return res.status(200).json({ etablissement: etablissement });
    })
    .catch((err) => error_handler(err, next));
};
exports.client = (req, res, next) => {
  const id_client = req.params.id_client;
  Client.findByPk(id_client)
    .then((client) => {
      if (!client) {
        const error = new Error("Ce client n'existe pas.");
        error.status_code = 404;
        throw error;
      }
      return res.status(200).json({ client: client });
    })
    .catch((err) => error_handler(err, next));
};
exports.offre = (req, res, next) => {
  const if_offre = req.params.id_offre;

  Offre.findByPk(if_offre)
    .then((offre) => {
      if (!offre) {
        const error = new Error("Cette offre n'existe pas.");
        error.status_code = 404;
        throw error;
      }
      return res.status(200).json({ offre: offre });
    })
    .catch((err) => error_handler(err, next));
};
exports.coupon = (req, res, next) => {
  const id_coupon = req.params.id_coupon;
  Coupon.findByPk(id_coupon)
    .then((coupon) => {
      if (!coupon) {
        const error = new Error("Ce coupon n'existe pas.");
        error.status_code = 404;
        throw error;
      }
      return res.status(200).json({ coupon: coupon });
    })
    .catch((err) => error_handler(err, next));
};

exports.etablissements = async (req, res, next) => {
  try {
    const etablissements = await Etablissement.findAll();
    await res.status(200).json({ etablissements: etablissements });
  } catch (err) {
    error_handler(err, next);
  }
};
exports.clients = async (req, res, next) => {
  try {
    const clients = await Client.findAll();
    await res.status(200).json({ clients: clients });
  } catch (err) {
    error_handler(err, next);
  }
};
exports.coupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.findAll();
    await res.status(200).json({ coupons: coupons });
  } catch (err) {
    error_handler(err, next);
  }
};
exports.offres = async (req, res, next) => {
  try {
    const offres = await Offre.findAll();
    await res.status(200).json({ offres: offres });
  } catch (err) {
    error_handler(err, next);
  }
};
exports.update_etablissement = (req, res, next) => {
  const id_etablissement = req.params.id_etablissement;
  const nom = req.body.nom;
  const adresse = req.body.adresse;
  const RS = req.body.RS;
  const RC = req.body.RC;
  const NIS = req.body.NIS;
  const NIF = req.body.NIF;
  const NAF = req.body.NAF;
  const url_photo = req.body.url_photo;
  // we can add the offre

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // giving the first error message
    console.log(errors.array());
    const error = new Error(errors.array()[0].msg);
    error.status_code = 402;
    error.data = errors.array;
    console.log(error);
    throw error;
  }
  Etablissement.findByPk(id_etablissement)
    .then((etablissement) => {
      if (!etablissement) {
        const error = new Error("l'établissement n'esxiste pas.");
        error.status_code = 404;
        throw error;
      }
      // updating the fields
      etablissement.nom = nom;
      etablissement.adresse = adresse;
      etablissement.NIF = NIF;
      etablissement.NIS = NIS;
      etablissement.RS = RS;
      etablissement.RC = RC;
      etablissement.NAF = NAF;
      // updating the logo if it existe
      return etablissement.save();
    })
    .then((updated_etablissement) => {
      // sending response ;
      res.status(200).json({
        updated_etablissement: updated_etablissement,
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.update_client = async (req, res, next) => {
  const id_client = req.params.id_client;
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const email = req.body.email;
  const adresse = req.body.adresse;
  const pseudo = req.body.pseudo;
  const mot_de_passe = req.body.mot_de_passe;
  const nom_etablissement = req.body.nom_etablissement;
  const image = req.files ? req.files[0] : null;
  let((email_existe = false)), (pseudo_existe = false);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.status_code = 402;
      throw error;
    }
    const fetched_client = await Client.findByPk(id_client);
    if (!fetched_client) {
      const error = new Error("Le client n'existe pas.");
      error.status_code = 404;
      throw error;
    }
    // updating the email
    if (fetched_client.email !== email) {
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
        fetched_client.email = email;
      }
    }
    if (fetched_client.pseudo !== pseudo) {
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
        fetched_client.pseudo = pseudo;
      }
    }
    const password_matches = await bcrypt.compare(
      mot_de_passe,
      fetched_client.mot_de_passe
    );
    if (!password_matches) {
      const new_password = await bcrypt.hash(mot_de_passe, 12);
      fetched_client.mot_de_passe = new_password;
    }
    // cheking if the etablissment existe
    const etablissement = await Etablissement.findOne({
      where: { nom: nom_etablissement },
    });
    if (!etablissement) {
      const error = new Error("L'etablissement n'existe pas.");
      error.status_code = 404;
      throw error;
    }
    fetched_client.id_etablissement = etablissement.dataValues.id_etablissement;
    fetched_client.nom = nom;
    fetched_client.prenom = prenom;
    fetched_client.adresse = adresse;
    if (image) {
      fetched_client.url_photo = image.path;
    }
    const saved_client = await fetched_client.save();
    res.status(200).json({
      updated_client: saved_client,
    });
  } catch (err) {
    error_handler(err, next);
  }
};

// delete methods
