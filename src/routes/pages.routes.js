const express = require("express");
const router = express.Router();
const { sendContactForm } = require("../controllers/contact.controller.js");

router.get("/conocenos", (req, res) => {
  res.render("conocenos");
});
router.get("/contacto", (req, res) => {
  res.render("contacto");
});
router.get("/galeria", (req, res) => {
  res.render("galeria");
});
router.post("/contacto", sendContactForm);

module.exports = router;