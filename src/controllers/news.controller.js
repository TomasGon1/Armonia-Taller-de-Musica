const News = require("../models/News.js");

//Lista de noticias (admin)
const listNews = async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 }).lean();
  res.render("admin/news", { news });
};

//Formulario de creacion
const renderCreate = (req, res) => {
  res.render("admin/createNews");
};

//Crear noticia
const createNews = async (req, res) => {
  const { title, content } = req.body;

  const linkToContact = req.body.linkToContact === "on";

  await News.create({ title, content, linkToContact });
  res.redirect("/admin/news");
};

//Eliminar noticia
const deleteNews = async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.redirect("/admin/news");
};

module.exports = {
  listNews,
  renderCreate,
  createNews,
  deleteNews,
};
