const booksService = require('../services/dbService');
const fs = require('fs');


const booksController = {
    async helloWorld(req, res, next) {
        try {
            res.send({ message: 'Hello there all' });
        } catch (error) {
            next(error);
        }
    },
    async getAllBooks(req, res, next) {
        try {
            await booksService.getAllBooks(req.query.limit, req.query.offset, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.status(500).send(err.message);
                } else {
                    res.send(result);
                }
            });
        } catch (error) {
            next(error);
        }
    },
    async getBookById(req, res, next) {

        try {
            await booksService.getBookById(req.params.id, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.status(500).send(err.message);
                } else {
                    res.send(result);
                }
            });
        } catch (error) {
            next(error);
        }
    },
    async getBookAuthors(req, res, next) {
        try {
            await booksService.getBookAuthors(req.params.id, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.status(500).send(err.message);
                } else {
                    res.send(result);
                }
            });
        } catch (error) {
            next(error);
        }
    },
    async getBookSubjects(req, res, next) {
        try {
            await booksService.getBookSubjects(req.params.id, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.status(500).send(err.message);
                } else {
                    res.send(result);
                }
            });
        } catch (error) {
            next(error);
        }
    },
    async searchBooks(req, res, next) {
        try {
            await booksService.searchBooks(req.query.query, req.query.limit, req.query.offset, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.status(500).send(err.message);
                } else {
                    res.send(result);
                }
            });
        } catch (error) {
            next(error);
        }
    },
    async getAllSubjects(req, res, next) {
        try {
            await booksService.getAllSubjects(req.query.limit, req.query.offset, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.status(500).send(err.message);
                } else {
                    res.send(result);
                }
            });
        } catch (error) {
            next(error);
        }
    },
    async getBooksBySubject(req, res, next) {
        try {
            await booksService.getBooksBySubject(req.query.subject, req.query.limit, req.query.offset, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.status(500).send(err.message);
                } else {
                    res.send(result);
                }
            });
        } catch (error) {
            next(error);
        }
    },
    async getBookText(req, res, next) {
        try {
            await booksService.getBookText(req.params.id, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.status(500).send(err.message);
                } else {
                    res.send(result);
                }
            });
        } catch (error) {
            next(error);
        }
    },


}

module.exports = booksController;