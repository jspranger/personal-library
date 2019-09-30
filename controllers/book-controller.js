const mongoose = require('mongoose');
const BookModel = require('../models/book-model.js')

async function findAll(req, res) {
  const books = await BookModel.find({});
  
  const result = books.map(value => {
    return {
      _id: value._id,
      title: value.title,
      commentcount: value.comments.length
    }
  });
  
  return res.json(result);
}

async function find(req, res, next) {
  const _id = new mongoose.Types.ObjectId(req.params.id);
  
  if (mongoose.Types.ObjectId.isValid(_id)) {
    const book = await BookModel.findOne({ _id: _id });
    
    if (book !== null) {
      return res.json(book);
    }
  } else {
    return res.status(400).send('id is not valid');
  }
  
  next();
}

async function create(req, res, next) {
  const title = req.body.title;
  console.log(title);
  if (title !== undefined) {
    const existingBook = await BookModel.findOne({ title: title });

    if (existingBook.length === 0) {
      const newBookModel = new BookModel({
        _id: new mongoose.Types.ObjectId(),
        title: title
      });

      const savedBookModel = await newBookModel.save();

      return res.json(savedBookModel);
    }

    return res.json(existingBook);
  }
  
  next();
}

async function createComment(req, res, next) {
  const _id = new mongoose.Types.ObjectId(req.params.id);
  
  if (mongoose.Types.ObjectId.isValid(_id)) {
    if (req.body.comment.length > 0) {
      const book = await BookModel.findOneAndUpdate({ _id: _id },
                                                     { '$push': { 'comments': req.body.comment } },
                                                     { new: true, useFindAndModify: false });
    
      if (book !== null) {
        return res.json(book);
      }
    } else {
      return res.status(400).send('comment is empty');
    }
  } else {
    return res.status(400).send('id is not valid');
  }
  
  next();
}

async function destroyAll(req, res, next) {
  const removed = await BookModel.remove({});
  
  if (removed.deletedCount > 0) {
    return res.send('complete delete successful');
  }
  
  next();
}

async function destroy(req, res, next) {
  const _id = new mongoose.Types.ObjectId(req.params.id);
  
  if (mongoose.Types.ObjectId.isValid(_id)) {
    const removed = await BookModel.remove({ _id: _id });

    if (removed.deletedCount > 0) {
      return res.send('delete successful');
    }
  } else {
    return res.status(400).send('id is not valid');
  }
  
  next();
}

module.exports = {
    findAll,
    find,
    create,
    createComment,
    destroyAll,
    destroy
}
