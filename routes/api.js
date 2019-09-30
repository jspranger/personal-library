/*
*
*
*       Complete the API routing below
*       
*       
*/
'use strict';
const BookController = require('./../controllers/book-controller.js')

const expect = require('chai').expect;
const mongoose = require('mongoose');

const MONGODB_CONNECTION_STRING = process.env.DB;

mongoose.connect(MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = function (app) {
  app
  .route('/api/books')
  .get(BookController.findAll)
  .post(BookController.create, (req, res) => res.status(400).send('title property missing'))
  .delete(BookController.destroyAll, (req, res) => res.send('nothing to delete'));

  app
  .route('/api/books/:id')
  .get(BookController.find, (req, res) => res.send('no book exists'))
  .post(BookController.createComment, (req, res) => res.send('could not create comment'))
  .delete(BookController.destroy, (req, res) => res.send('nothing to delete'));
};
