const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.get('/books', (req, res) => {
    db.getAllBooks(req.query.limit, req.query.offset, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });

});



app.get('/books/:id', (req, res) => {
    db.getBookById(req.params.id, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
});
app.get('/search', (req, res) => {
    db.searchBooks(req.query.query, req.query.limit, req.query.offset, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });

});

app.get('/subjects', (req, res) => {
    db.getAllSubjects((err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });

});

app.get('/bysubject', (req, res) => {

    db.getBooksBySubject(req.query.subject, req.query.limit, req.query.offset, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });

});

app.get('/gettext/:id', (req, res) => {
    db.getBookText(req.params.id, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});