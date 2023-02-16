const router = require("express").Router();

const { isAuth } = require("../middlewares/authMiddleware");
const bookService = require("../services/bookService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/catalog", async (req, res) => {
  const books = await bookService.getAll().lean();

  console.log(books);

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

module.exports = router;
