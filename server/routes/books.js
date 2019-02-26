//  Name : Dipeshpuri Goswami
//  StudentId : 300984229
//  WebApp Name : Mid-term Test

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Book List',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/details', {
        title: 'Add a Books',
        books: books
      });
    }
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  console.log(req.body.NameTextField);
  let newBookObject = book({
    "Title": req.body.NameTextField,
    "Price": req.body.PriceTextField,
    "Author": req.body.AuthorTextField,
    "Genre": req.body.GenreTextField,
  });
  book.create(newBookObject, (err, books) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/books');
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;

  book.findById(id, (err, booksObject) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/details', {
        title: 'Edit Books',
        books: booksObject
      });
    }
  });

});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id;

  let updatedBook = book({
    "_id": id,
    "Title": req.body.NameTextField,
    "Price": req.body.PriceTextField,
    "Author": req.body.AuthorTextField,
    "Genre": req.body.GenreTextField,

  });

  book.update({ _id: id }, updatedBook, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/books');
    }
  })
});


// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  book.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/books');
    }
  });


});




module.exports = router;
