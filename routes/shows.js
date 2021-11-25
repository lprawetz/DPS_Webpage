const express = require("express");
const router = express.Router();
const shows = require("../controllers/shows");
const { validateShow, isLoggedIn } = require("../utils/middleware");
const catchAsync = require("../utils/catchAsync");

//list shows
router.get("/", catchAsync(shows.shows));

//create new show
router.get("/new", isLoggedIn, shows.renderNewForm);
router.post("/", isLoggedIn, validateShow, catchAsync(shows.createNewShow));

//edit show
router.get("/:id/edit", isLoggedIn, catchAsync(shows.renderEditForm));
router.put("/:id", isLoggedIn, catchAsync(shows.updateShow));

//delete show
router.delete("/:id", isLoggedIn, catchAsync(shows.deleteShow));

module.exports = router;