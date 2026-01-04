const globalMiddleware = (req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
};

const fullYear = (req, res, next) => {
  res.locals.year = new Date().getFullYear();
  next();
}; 

module.exports = {
  globalMiddleware,
  fullYear
};
