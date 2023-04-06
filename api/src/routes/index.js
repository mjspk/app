const routes = require("express").Router();
const authRoutes = require("./authRoutes");
const booksRoutes = require("./booksRoutes");

routes.use('/auth', authRoutes);
routes.use('/db', booksRoutes);
module.exports = routes;