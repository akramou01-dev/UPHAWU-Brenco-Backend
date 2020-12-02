const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const client_controllers = require("../controllers/client");
/**Routes Naming
 * POST for creating
 * PUT for
 * DELETE for delete
 * GET for getting all
 * GET/:id for getting on element
 */

// POST Routes

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
  /**adding isClient middelware, */
  client_controllers.create_signataire
);

router.post(
  "/theme",
  [
    body("titre")
      .not()
      .isEmpty()
      .withMessage("Le titre du theme est obligatoire"),
  ],
  client_controllers.create_theme
);

router.post(
  "/compagne",
  [
    body("titre_compagne")
      .not()
      .isEmpty()
      .withMessage("Le titre de la compagne est manquant."),
    body("description")
      .not()
      .isEmpty()
      .withMessage("La description de la compagne est manquante.")
      .isLength({ min: 10, max: 100 })
      .withMessage("La description doit etre entre 10 et 100 caracters"),
    body("titre_theme")
      .not()
      .isEmpty()
      .withMessage("Le titre du theme de la compagne est manquant."),
    body("id_template")
      .not()
      .isEmpty()
      .withMessage("Veillez selectionner une template pour les attestation."),
    // body("signataires")
    //   .not()
    //   .isEmpty()
    //   .withMessage(
    //     "Il faut selectionner au moin un signataire pour la compagne."
    //   )
    //   .isArray()
    //   .withMessage("Les sigataires doivent étre dans un tableau."),
  ],
  client_controllers.create_compagne
);

// GET ONE Routes
router.get(
  "/signataire/:id_signataire",
  /**adding isClient middelware, */ client_controllers.signataire
);

// GET ALL Routes
router.get(
  "/signataire",
  /**adding isClient middelware, */ client_controllers.signataires
);
router.get(
  "/theme",
  /**adding isClient middelware, */ client_controllers.themes
);

// PUT Routes
router.put(
  "/signataire/:id_signataire",
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
  client_controllers.update_signataire
);

module.exports = router;
