var Pool = require('../models/pool.model');

// Async function to get the To do List
exports.getPools = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit,
    };

    console.log(options, query)

    try {
        var pools = await Pool.paginate(query, options)
        return pools;
    } catch (e) {
        throw Error('Error while Paginating Pools')
    }
}

exports.createPool = async function (pool) {
    var newPool = new Pool({
        name: pool.name,
    });
    try {
        var savedPool = await newPool.save();
        return savedPool;
    } catch (e) {
        throw Error("Error while Creating Pool")
    }
}

exports.updatePool = async function (pool) {
    var id = pool.id

    try {
        var oldPool = await Pool.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Pool")
    }

    if (!oldPool) {
        return false;
    }

    oldPool.id = pool.id
    oldPool.name = pool.name

    try {
        var savedPool = await oldPool.save()
        return savedPool;
    } catch (e) {
        throw Error("And Error occured while updating the Pool");
    }
}

exports.deletePool = async function (id) {

    try {
        var deleted = await Pool.remove({ _id: id });
        return deleted
    } catch (e) {
        throw Error("Error Occured while Deleting the Pool")
    }
}