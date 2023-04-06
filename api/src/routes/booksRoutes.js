
const booksRoutes = require('express').Router();
const booksController = require('../controllers/booksController');


booksRoutes.get('/books', booksController.getAllBooks);
booksRoutes.get('/books/:id', booksController.getBookById);
booksRoutes.get('/authors/:id', booksController.getBookAuthors);
booksRoutes.get('/subjects/:id', booksController.getBookSubjects);
booksRoutes.get('/search', booksController.searchBooks);
booksRoutes.get('/subjects', booksController.getAllSubjects);
booksRoutes.get('/bysubject', booksController.getBooksBySubject);
booksRoutes.get('/gettext/:id', booksController.getBookText);


module.exports = booksRoutes;