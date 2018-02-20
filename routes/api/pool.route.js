var express = require('express')
var router = express.Router()

var PoolController = require('../../controllers/pool.controller');

router.get('/', PoolController.getPools)
router.get('/:id', PoolController.getPool)
router.post('/', PoolController.createPool)
router.put('/', PoolController.updatePool)
router.delete('/:id', PoolController.removePool)

module.exports = router;