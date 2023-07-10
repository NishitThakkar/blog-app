const express = require("express")
const router = express.Router()
const passport = require("passport")
const jwt = require("jsonwebtoken");
const userController = require("../controllers/user")
require("../middleware/passport")(passport);

router.post('/login', userController.login)

router.post("/signup", userController.signup);

module.exports = router