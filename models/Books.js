const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 2,
    required: true,
  },
  author: {
    type: String,
    minLength: 5,
    required: true,
  },
  image: {
    type: String,
    validate: /https?:\/\//g,
    required: true,
  },
  bookReview: {
    type: String,
    minLength: 10,
    required: true,
  },
  genre: {
    type: String,
    minLength: 3,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  wishlist: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Books = mongoose.model("Book", bookSchema);
module.exports = Books;
