const express = require("express");
const body_parser = require("body-parser");
// import database
const sequelize = require("./config/Database");

// create admin helper method
const create_admin = require("./utils/admin").create_admin;
const app = express();

// importing routes
const adminRoutes = require("./routes/admin");

// import Models
// const Admin = require('./models/Admin')
// const Attestation = require('./models/Attestation')

// const Classe = require("./models/Classe");
// const Client = require("./models/Client");
// const Commande= require("./models/Commande");
// const CondidatClasse= require("./models/CondidatClasse");
// const Condidat= require("./models/Condidat");
// const Cotat= require("./models/Cotat");
// const Coupon= require("./models/Coupon");

// const Etablissement= require("./models/Etablissement");

// const Facture= require("./models/Facture");
// const Formation= require("./models/Formation");

// const Offre= require("./models/Offre");

// const QRCode= require("./models/QRCode");

// const Signataire= require("./models/Signataire");

// const TemplateAttestation= require("./models/TemplateAttestation");
// const Theme= require("./models/Theme");
// const TypePaiment= require("./models/TypePaiment");

// parsing requests
app.use(body_parser.json());
app.use(body_parser.urlencoded());

// setting headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // pour definir les domain qui peuvent accéder a notre serveur
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH"); //pour ajouter les methodes qu'on peut utiliser
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // pour ajouter un Content-Type et une autorization
  next();
});
// app.use("/", (req, res, next) => {
//   res.send("hey from app.js");
// });

// using routes middelwares
app.use("/admin", adminRoutes);

//Error middelware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.status_code || 500;
  const message = error.message || "une erreur est produit";
  const data = error.data;
  res.status(status).json({ data: data, message: message, status: status });
});

// creating of the admin if he does not existe
create_admin();

// Database Relations

sequelize
  // .sync({force : true})
  .sync()
  .then((result) => {
    const PORT = process.env.PORT || 5000;
    console.log("Server is listening in port: " + PORT);
    app.listen(PORT);
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(err);
  });
