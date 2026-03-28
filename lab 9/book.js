const mongoose = require('mongoose');

const {Schema} = mongoose;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  date: { type: String, required: true }, // technically should be Date but only month and year
  website: [{ type: String, required: true }],
});

const Book = mongoose.model('Book', BookSchema);

module.exports = {Book};