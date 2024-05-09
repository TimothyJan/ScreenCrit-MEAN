const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let BookReview = new Schema({
  googleId : {
    type: String
  },
  rating: {
    type: Number
  },
  review: {
    type: String
  },
}, {
  collection: 'BookReview'
})
module.exports = mongoose.model('BookReview', BookReview)