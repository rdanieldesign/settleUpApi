var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var secret = require("../../credentials").secret;
var auth = jwt({
    secret,
    userProperty: 'user'
});

var PoolController = require('../../controllers/pool.controller');

router.get('/', auth, PoolController.getCreatedPools);
router.get('/:id', auth, PoolController.getPool);
router.post('/', auth, PoolController.createPool);
router.put('/', auth, PoolController.updatePool);
router.delete('/:id', auth, PoolController.removePool);

module.exports = router;