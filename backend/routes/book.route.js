const express = require('express');
const app = express();
const bookReviewRoute = express.Router();

// Book Review model
let BookReview = require('../models/BookReview');

// Add Book Review
bookReviewRoute.route('/create').post((req, res, next) => {
  BookReview.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Book Reviews
bookReviewRoute.route('/').get((req, res) => {
  BookReview.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single bookReview
bookReviewRoute.route('/read/:id').get((req, res) => {
  BookReview.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update bookReview
bookReviewRoute.route('/update/:id').put((req, res, next) => {
  BookReview.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete bookReview
bookReviewRoute.route('/delete/:id').delete((req, res, next) => {
  BookReview.findOneAndRemove({_id: req.params.id}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = bookReviewRoute;