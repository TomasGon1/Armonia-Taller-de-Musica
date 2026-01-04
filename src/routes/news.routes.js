const express = require("express");
const router = express.Router();

const isAdmin = require("../middlewares/auth.js");
const {
    listNews,
    renderCreate,
    createNews,
    deleteNews
} = require("../controllers/news.controller.js");

//Rutas de noticias (admin)
router.get("/news", isAdmin, listNews);
router.get("/news/create", isAdmin, renderCreate);
router.post("/news/create", isAdmin, createNews);
router.get("/news/delete/:id", isAdmin, deleteNews);

module.exports = router;