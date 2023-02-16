const Books = require("../models/Books");

exports.getAll = () => Books.find({});

exports.create = (ownerId, bookData) =>
  Books.create({
    ...bookData,
    owner: ownerId,
  });
