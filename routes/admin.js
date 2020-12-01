const express = require("express");
const router = express.Router();
// adding validator
const { body } = require("express-validator");

/**Routes Naming
 * POST for creatin
 * PUT for
 * DELETE for delete
 * GET for getting all
 * GET/:id for getting on element
 */

// importing admine controllers
const admine_controllers = require("../controllers/admin");

// POST Routes
router.post(
  "/etablissement",
  [
    // validating all the request fields
    body("nom").notEmpty().withMessage("Le nom ne doit pas etre vide.").trim(),
    body("adresse").notEmpty().withMessage("L'adresse ne doit pas etre vide."),
    body("RS")
      .notEmpty()
      .withMessage("La raison social ne doit pas etre vide."),
    body("NIS")
      .notEmpty()
      .withMessage("Le numero d'identité statique ne doit pas etre vide."),
    body("NIF")
      .notEmpty()
      .withMessage("Le numero d'identification fiscal ne doit pas etre vide."),
    body("RC")
      .notEmpty()
      .withMessage("Un etablissement doit avoir un registre de commerce."),
    body("NAF")
      .notEmpty()
      .withMessage("Le numero d'article fiscal est obligatoire."),
  ],
  /*adding isAdmin, middleware */ admine_controllers.create_etablissement
);

router.post(
  "/offre",
  [
    body("nom")
      .not()
      .isEmpty()
      .withMessage("Le nom ne doit pas etre vide.")
      .trim(),
    body("durée")
      .not()
      .isEmpty()
      .withMessage("La duée ne doit pas etre vide.")
      .isNumeric()
      .withMessage("La durée doit étre un entier.")
      .trim(),
    body("nbr_QR_code")
      .not()
      .isEmpty()
      .withMessage("Definissez le nombre de qrcode lié a cette offre.")
      .isNumeric()
      .withMessage("Le nombre doit etre un chiffre"),
  ],
  /**adding isAdmin middelware, */ admine_controllers.create_offre
);

router.post(
  "/client",
  [
    body("nom").not().isEmpty().withMessage("Le nom est obligatoire").trim(),
    body("prenom")
      .not()
      .isEmpty()
      .withMessage("Le prenom est obligatoire")
      .trim(),
    body("email")
      .not()
      .isEmpty()
      .withMessage("L'email est obligatoire")
      .isEmail()
      .withMessage("Votre email n'est pas valide.")
      .normalizeEmail({
        gmail_remove_dots: false,
        yahoo_remove_subaddress: false,
      }),
    body("adresse")
      .not()
      .isEmpty()
      .withMessage("L'adresse est obligatoire")
      .trim(),
    body("mot_de_passe")
      .not()
      .isEmpty()
      .withMessage("Définissez un mot de passe SLVP")
      .isLength({ max: 15, min: 5 })
      .withMessage("Mot de passe doit contenir entre 5 et 15 caractéres."),
    body("pseudo")
      .not()
      .isEmpty()
      .withMessage("Définissez un pseudo SLVP")
      .custom((value) => !/\s/.test(value))
      .withMessage("Le pseudo ne contient pas d'éspaces")
      .trim(),
    body("nom_etablissement")
      .not()
      .isEmpty()
      .withMessage("Entrez le nom de l'etablissement du client.")
      .trim(),
  ],
  /**adding isAdmin middelware, */
  admine_controllers.create_client
);

router.post(
  "/signataire",
  [
    body("nom").not().isEmpty().withMessage("Le nom est obligatoire").trim(),
    body("prenom")
      .not()
      .isEmpty()
      .withMessage("Le prenom est obligatoire")
      .trim(),
    body("email")
      .not()
      .isEmpty()
      .withMessage("L'email est obligatoire")
      .isEmail()
      .withMessage("Votre email n'est pas valide.")
      .normalizeEmail({
        gmail_remove_dots: false,
        yahoo_remove_subaddress: false,
      }),
    body("adresse")
      .not()
      .isEmpty()
      .withMessage("L'adresse est obligatoire")
      .trim(),
    body("mot_de_passe")
      .not()
      .isEmpty()
      .withMessage("Définissez un mot de passe SLVP")
      .isLength({ max: 15, min: 5 })
      .withMessage("Mot de passe doit contenir entre 5 et 15 caractéres."),
    body("pseudo")
      .not()
      .isEmpty()
      .withMessage("Définissez un pseudo SLVP")
      .custom((value) => !/\s/.test(value))
      .withMessage("Le pseudo ne contient pas d'éspaces")
      .trim(),
    body("client")
      .not()
      .isEmpty()
      .withMessage("Entrez le nom et le prenom du client.")
      .trim(),
  ],
  /**adding isAdmin middelware, */
  admine_controllers.create_signataire
);

router.post(
  "/type-paiment",
  [body("nom").not().isEmpty().withMessage("Le nom du type est obligatoire")],
  admine_controllers.create_type_paiment
);

router.post(
  "/coupon",
  [
    body("code")
      .not()
      .isEmpty()
      .withMessage("Vous n'avez pas mentionnez le code du coupon"),
    body("nbr_QR_code")
      .not()
      .isEmpty()
      .withMessage("Précisez le nombre de QRCodes.")
      .isNumeric()
      .withMessage("Le nombre de QRCode doit étre un nombre"),
    body("nbr_utilisation")
      .not()
      .isEmpty()
      .withMessage("Précisez le nombre d'utilisation de ce Coupon.")
      .isNumeric()
      .withMessage("Le nombre d'utilisation doit étre un nombre"),
    body("reduction")
      .not()
      .isEmpty()
      .withMessage("Précisez la reduction de ce Coupon.")
      .isNumeric()
      .withMessage("la reduction doit étre un nombre"),
    body("date_debut")
      .not()
      .isEmpty()
      .withMessage("date du debut est obligatoire.")
      .isDate()
      .withMessage("la date debut n'est pas valide"),
    body("date_fin")
      .not()
      .isEmpty()
      .withMessage("date de la fin est obligatoire.")
      .isDate()
      .withMessage("la date fin n'est pas valide"),
  ],
  admine_controllers.create_coupon
);

// GET Routes

// get_all

router.get(
  "/etablissement",
  /**adding isAdmin middelware, */ admine_controllers.etablissements
);
router.get(
  "/client",
  /**adding isAdmin middelware, */ admine_controllers.clients
);
router.get(
  "/signataire",
  /**adding isAdmin middelware, */ admine_controllers.signataires
);
router.get(
  "/offre",
  /**adding isAdmin middelware, */ admine_controllers.offres
);
router.get(
  "/coupon",
  /**adding isAdmin middelware, */ admine_controllers.coupons
);

// get_one

router.get(
  "/etablissement/:id_etablissement",
  /**adding isAdmin middelware, */ admine_controllers.etablissement
);
router.get(
  "/client/:id_client",
  /**adding isAdmin middelware, */ admine_controllers.client
);
router.get(
  "/signataire/:id_signataire",
  /**adding isAdmin middelware, */ admine_controllers.signataire
);
router.get(
  "/offre/:id_offre",
  /**adding isAdmin middelware, */ admine_controllers.offre
);
router.get(
  "/coupon/:id_coupon",
  /**adding isAdmin middelware, */ admine_controllers.coupon
);

// PUT Routes

router.put(
  "/etablissement/:id_etablissement",
  [
    body("nom").notEmpty().withMessage("Le nom ne doit pas etre vide.").trim(),
    body("adresse").notEmpty().withMessage("L'adresse ne doit pas etre vide."),
    body("RS")
      .notEmpty()
      .withMessage("La raison social ne doit pas etre vide."),
    body("NIS")
      .notEmpty()
      .withMessage("Le numero d'identité statique ne doit pas etre vide."),
    body("NIF")
      .notEmpty()
      .withMessage("Le numero d'identification fiscal ne doit pas etre vide."),
    body("RC")
      .notEmpty()
      .withMessage("Un etablissement doit avoir un registre de commerce."),
    body("NAF")
      .notEmpty()
      .withMessage("Le numero d'article fiscal est obligatoire."),
  ],
  admine_controllers.update_etablissement
);


router.put("/client/:id_client", [
  body("nom").not().isEmpty().withMessage("Le nom est obligatoire").trim(),
    body("prenom")
      .not()
      .isEmpty()
      .withMessage("Le prenom est obligatoire")
      .trim(),
    body("email")
      .not()
      .isEmpty()
      .withMessage("L'email est obligatoire")
      .isEmail()
      .withMessage("Votre email n'est pas valide.")
      .normalizeEmail({
        gmail_remove_dots: false,
        yahoo_remove_subaddress: false,
      }),
    body("adresse")
      .not()
      .isEmpty()
      .withMessage("L'adresse est obligatoire")
      .trim(),
    body("mot_de_passe")
      .not()
      .isEmpty()
      .withMessage("Définissez un mot de passe SLVP")
      .isLength({ max: 15, min: 5 })
      .withMessage("Mot de passe doit contenir entre 5 et 15 caractéres."),
    body("pseudo")
      .not()
      .isEmpty()
      .withMessage("Définissez un pseudo SLVP")
      .custom((value) => !/\s/.test(value))
      .withMessage("Le pseudo ne contient pas d'éspaces")
      .trim(),
    body("nom_etablissement")
      .not()
      .isEmpty()
      .withMessage("Entrez le nom de l'etablissement du client.")
      .trim(),
] , admine_controllers.update_client)
router.put("/signataire/:id_signataire", [
  body("nom").not().isEmpty().withMessage("Le nom est obligatoire").trim(),
    body("prenom")
      .not()
      .isEmpty()
      .withMessage("Le prenom est obligatoire")
      .trim(),
    body("email")
      .not()
      .isEmpty()
      .withMessage("L'email est obligatoire")
      .isEmail()
      .withMessage("Votre email n'est pas valide.")
      .normalizeEmail({
        gmail_remove_dots: false,
        yahoo_remove_subaddress: false,
      }),
    body("adresse")
      .not()
      .isEmpty()
      .withMessage("L'adresse est obligatoire")
      .trim(),
    body("mot_de_passe")
      .not()
      .isEmpty()
      .withMessage("Définissez un mot de passe SLVP")
      .isLength({ max: 15, min: 5 })
      .withMessage("Mot de passe doit contenir entre 5 et 15 caractéres."),
    body("pseudo")
      .not()
      .isEmpty()
      .withMessage("Définissez un pseudo SLVP")
      .custom((value) => !/\s/.test(value))
      .withMessage("Le pseudo ne contient pas d'éspaces")
      .trim(),
    body("client")
      .not()
      .isEmpty()
      .withMessage("Entrez le nom et le prenom du client.")
      .trim(),

], admine_controllers.update_signataire)

// exporting the router
module.exports = router;
