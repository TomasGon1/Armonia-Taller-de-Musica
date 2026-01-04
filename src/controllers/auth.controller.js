const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

//Render del login
const renderLogin = (req, res) => {
  res.render("login");
};

//Procesar login
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.render("login", { error: "Credenciales no validas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render("login", { error: "Credenciales no validas" });
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      role: user.role,
    };

    res.redirect("/admin");
  } catch (error) {
    console.error(error);
    res.render("login", { error: "Error al iniciar sesion" });
  }
};

//Logout
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

module.exports = {
  renderLogin,
  login,
  logout,
};
