const router = require("express").Router();

const { isAuth } = require("../middlewares/authMiddleware");
const bookService = require("../services/bookService");
const { getErrorMessage } = require("../utils/errorUtils");

const Books = require("../models/Books");

router.get("/catalog", async (req, res) => {
  const books = await bookService.getAll().lean();

  res.render("books/catalog", { books });
});

router.get("/create", isAuth, async (req, res) => {
  res.render("books/create");
});

router.post("/create", isAuth, async (req, res) => {
  try {
    await bookService.create(req.user._id, req.body);
  } catch (error) {
    return res
      .status(400)
      .render("books/create", { error: getErrorMessage(error) });
  }

  res.redirect("/books/catalog");
});

router.get("/:bookId/details", async (req, res) => {
  const book = await bookService.getOne(req.params.bookId);
  const isOwner = book.owner.toString() === req.user?._id;
  const isWished = book.wishlist?.some((id) => id == req.user?._id);

  res.render("books/details", { book, isOwner, isWished });
});

router.get("/:bookId/wish", isAuth, async (req, res) => {
  await bookService.wish(req.user._id, req.params.bookId);

  res.redirect(`/books/${req.params.bookId}/details`);
});

router.get("/:bookId/edit", isAuth, async (req, res) => {
  const book = await bookService.getOne(req.params.bookId);

  res.render("books/edit", { book });
});

router.post("/:bookId/edit", isAuth, async (req, res) => {
  await Books.findByIdAndUpdate(req.params.bookId, req.body);

  res.redirect(`/books/${req.params.bookId}/details`);
});

router.get("/:bookId/delete", isAuth, async (req, res) => {
  await Books.findByIdAndDelete(req.params.bookId);

  res.redirect("/books/catalog");
});

module.exports = router;
