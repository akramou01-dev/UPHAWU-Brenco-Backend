const express = require("express");
const router = express.Router();
const signataire_controller = require("../controllers/signataire");
const { body } = require("express-validator");

/**Routes Naming
 * POST for creating
 * PUT for
 * DELETE for delete
 * GET for getting all
 * GET/:id for getting on element
 */

// POST Routes

router.post(
  "/classe",
  [
    body("nom").notEmpty().withMessage("Le nom de la classe est manquante."),
    body("date_debut")
      .notEmpty()
      .withMessage("La date du debut de la classe est manquante.")
      .isDate()
      .withMessage("La date du debut n'est pas valide."),

    body("date_fin")
      .notEmpty()
      .withMessage("La date de la fin de la classe est manquante.")
      .isDate()
      .withMessage("La date de la fin n'est pas valide."),
    body("titre_compagne")
      .notEmpty()
      .withMessage("Le titre de la compagne est manquant."),
  ],
  signataire_controller.create_classe
);
router.get("/classe", signataire_controller.classes)
module.exports = router;
