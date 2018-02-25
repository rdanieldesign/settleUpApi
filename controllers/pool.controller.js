var PoolService = require('../services/pool.service');

exports.getPools = async function (req, res, next) {

    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) return res.status(401).json({ "message": "Unauthorized Error" });

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try {
        var pools = await PoolService.getPools({}, page, limit);
        return res.status(200).json({ status: 200, data: pools, message: "Succesfully RecievednPools"});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getPool = async function(req, res, next) {
    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) return res.status(401).json({ "message": "Unauthorized Error" });

    try {
        var pool = await PoolService.getPool(req.params.id);
        return res.status(200).json({status: 200, data: pool, message: "Successfully Received Pool"});
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createPool = async function (req, res, next) {
    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) return res.status(401).json({ "message": "Unauthorized Error" });

    var pool = {
        name: req.body.name,
    }
    try {
        var createdPool = await PoolService.createPool(pool);
        return res.status(201).json({ status: 201, data: createdPool, message: "Succesfully Created Pool" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Pool Creation was Unsuccesfull" })
    }
}

exports.updatePool = async function (req, res, next) {
    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) return res.status(401).json({ "message": "Unauthorized Error" });

    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "Id must be present" })
    }
    var id = req.body._id;
    var pool = {
        id,
        name: req.body.name ? req.body.name : null,
    }

    try {
        var updatedPool = await PoolService.updatePool(pool)
        return res.status(200).json({ status: 200, data: updatedPool, message: "Succesfully Updated Pool" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}

exports.removePool = async function (req, res, next) {
    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) return res.status(401).json({ "message": "Unauthorized Error" });
    
    var id = req.params.id;
    try {
        var deleted = await PoolService.deletePool(id)
        return res.status(204).json({ status: 204, message: "Succesfully Pool Deleted" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }

}