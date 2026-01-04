const express = require("express");
const router = express.Router();
const isAdmin = require("../middlewares/auth.js");

//Ruta del admin
router.get("/", isAdmin, (req, res) => {
  res.render("admin", {
    username: req.session.user.username,
  });
});

module.exports = router;