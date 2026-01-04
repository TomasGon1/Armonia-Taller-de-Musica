require("dotenv").config();
const connectDB = require("../config/db.js");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

const createAdmin = async () => {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);

    const admin = new User({
      username: process.env.ADMIN_USER,
      password: hashedPassword,
    });

    await admin.save();
    console.log("admin creado");
  } catch (error) {
    console.error("Error al crear el admin:".error);
  } finally {
    process.exit();
  }
};

createAdmin();
