var PoolService = require('../services/pool.service');

exports.getCreatedPools = async function (req, res, next) {
    // If no user ID exists in the JWT return a 401
    if (!req.user._id) return res.status(401).json({ "message": "Unauthorized Error" });

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try {
        var pools = await PoolService.getPools({ creator: req.user._id }, page, limit);
        return res.status(200).json({ status: 200, data: pools, message: "Succesfully Recieved Pools"});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getMyPools = async function (req, res, next) {
    // If no user ID exists in the JWT return a 401
    if (!req.user._id) return res.status(401).json({ "message": "Unauthorized Error" });

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try {
        var pools = await PoolService.getPools({ contributors: req.user._id }, page, limit);
        return res.status(200).json({ status: 200, data: pools, message: "Succesfully Recieved Pools" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getPool = async function(req, res, next) {
    // If no user ID exists in the JWT return a 401
    if (!req.user._id) return res.status(401).json({ "message": "Unauthorized Error" });

    try {
        var pool = await PoolService.getPool(req.params.id);
        return res.status(200).json({status: 200, data: pool, message: "Successfully Received Pool"});
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createPool = async function (req, res, next) {
    // If no user ID exists in the JWT return a 401
    if (!req.user._id) return res.status(401).json({ "message": "Unauthorized Error" });
    console.log(req.body.contributors);
    console.log(req.user._id);
    var pool = {
        name: req.body.name,
        creator: req.body.creator,
        contributors: req.body.contributors && req.body.contributors.length ? req.body.contributors : [req.user._id],
    };
    try {
        var createdPool = await PoolService.createPool(pool);
        return res.status(201).json({ status: 201, data: createdPool, message: "Succesfully Created Pool" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Pool Creation was Unsuccesfull" })
    }
}

exports.updatePool = async function (req, res, next) {
    // If no user ID exists in the JWT return a 401
    if (!req.user._id) return res.status(401).json({ "message": "Unauthorized Error" });

    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "Id must be present" })
    }
    var id = req.body._id;
    var pool = {
        id,
        name: req.body.name ? req.body.name : null,
        creator: req.body.creator ? req.body.creator : null,
        contributors: req.body.creator ? req.body.creator : [req.user._id],
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
    if (!req.user._id) return res.status(401).json({ "message": "Unauthorized Error" });
    
    var id = req.params.id;
    try {
        var deleted = await PoolService.deletePool(id)
        return res.status(204).json({ status: 204, message: "Succesfully Pool Deleted" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }

}