const router = require("express").Router();

const homeController = require("./cotrollers/homeController");
const authController = require("./cotrollers/authController");
const booksController = require("./cotrollers/booksController");

router.use(homeController);
router.use(authController);
router.use("/books", booksController);
router.all("*", (req, res) => {
  res.render("home/404");
});

module.exports = router;
