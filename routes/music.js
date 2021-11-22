const express = require("express");
const router = express.Router();
const music = require("../controllers/music");
const catchAsync = require("../utils/catchAsync");

//list records
router.get("/", catchAsync(music.records));

//show record
router.get("/:id", catchAsync(music.showRecord));

module.exports = router;