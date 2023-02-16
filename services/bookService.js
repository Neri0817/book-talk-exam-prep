const Books = require("../models/Books");

exports.getAll = () => Books.find({});

exports.getOne = (bookId) => Books.findById(bookId).lean();

exports.create = (ownerId, bookData) =>
  Books.create({
    ...bookData,
    owner: ownerId,
  });

exports.wish = async (userId, bookId) => {
  const book = await Books.findById(bookId);
  book.wishlist.push(userId);
  return book.save();
};
