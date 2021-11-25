const express = require("express");
const router = express.Router();
const media = require("../controllers/media");
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });
const { isLoggedIn } = require("../utils/middleware");
const catchAsync = require("../utils/catchAsync");

//list media
router.get("/", catchAsync(media.media));

//create new media
router.get("/new", isLoggedIn, media.renderNewForm);
router.post("/", upload.single("medium"), catchAsync(media.createNewMedia));

module.exports = router;