const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
exports.create_admin = async (req, res, next) => {
  const admin = await Admin.findOne();
  if (!admin) {
    const password = await bcrypt.hash("superadmin", 12);
    const new_admin = new Admin({
      nom: "Admin",
      prenom: "Brenco",
      pseudo: "admin",
      mot_de_passe: password,
      email: "adminuphawu@brenco-algerie.com",
    });
    const newAdmin = await new_admin.save();
    console.log("Admin created successfuly");
  }
};
