const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const catchAsync = require("../utils/catchAsync");

//register adminlogin
router.get("/loginSetup", catchAsync(user.userSetup));

//login
router.get("/login", user.renderLogin);
router.post("/login", catchAsync(user.userLogin));

//logout
router.get("/logout", user.userLogout);

module.exports = router;
