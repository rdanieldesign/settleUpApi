var express = require("express");
var router = express.Router();
var register = require("./api/register.route");
var login = require("./api/login.route");
var pools = require("./api/pool.route");

// Authentication API's
router.use("/register", register);
router.use("/login", login);

router.use("/pools", pools);


module.exports = router;