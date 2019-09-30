const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: 'string', required: true },
  comments: []
});

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
