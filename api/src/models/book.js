
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id : {
        type: Number,
        required: true
    },
    download_count: {
        type: Number,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

 