var express = require("express");
var router = express.Router();
var register = require("./api/register.route");
var login = require("./api/login.route");
var pools = require("./api/pool.route");
var friends = require("./api/friend.route");

// Authentication API's
router.use("/register", register);
router.use("/login", login);

router.use("/pools", pools);
router.use("/friends", friends);


module.exports = router;