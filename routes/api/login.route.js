var express = require('express')
var router = express.Router()

var AuthenticationController = require('../../controllers/authentication.controller');

router.post('/', AuthenticationController.login)

module.exports = router;