var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var secret = require("../../credentials").secret;
var auth = jwt({
    secret,
    userProperty: 'user'
});

var PoolController = require('../../controllers/friend.controller');

router.get('/', auth, PoolController.getFriends);

module.exports = router;