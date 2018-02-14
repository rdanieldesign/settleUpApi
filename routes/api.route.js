var express = require('express')
var router = express.Router()
var pools = require('./api/pool.route')

router.use('/pools', pools);


module.exports = router;