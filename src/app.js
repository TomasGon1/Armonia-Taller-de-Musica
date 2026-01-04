//Configuracion Dotenv
require("dotenv").config();

//Imports generales
const express = require("express");
const connectDB = require("./config/db.js");
const sessionConfig = require("./config/session.js");
const News = require("./models/News.js");

//Import de Rutas
const authRoutes = require("./routes/auth.routes.js");
const newsRoutes = require("./routes/news.routes.js");
const adminRoutes = require("./routes/admin.routes.js");
const pagesRoutes = require("./routes/pages.routes.js");

//Import de Middlewares propios
const { globalMiddleware, fullYear } = require("./middlewares/middGlobal.js");

//Import de Handlebars
const exphbs = require("express-handlebars");

const app = express();

//DB
connectDB();

//Handlebars
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: "src/views/layouts",
    partialsDir: "src/views/partials",
    helpers: {
        eq: (a, b) => a === b,
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", "src/views");

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Session
app.use(sessionConfig);

//Middlewares propios
app.use(globalMiddleware);
app.use(fullYear);

//Rutas de autenticacion
app.use("/", authRoutes);
app.use("/admin", newsRoutes);
app.use("/admin", adminRoutes);
app.use("/", pagesRoutes);

//Rutas
app.get("/", async (req, res) => {
  const news = await News.find({ active: true })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
  res.render("inicio", { news });
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor activo en http://localhost:${process.env.PORT}`);
});
