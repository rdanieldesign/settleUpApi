var mongoose = require("mongoose");
var User = require('../models/user.model');

exports.registerUser = async function (user) {
    var newUser = new User({
        name: user.name,
        email: user.email,
    });
    newUser.setPassword(user.password);
    try {
        await newUser.save();
        var token = newUser.generateJwt();
        return token;
    } catch (e) {
        throw Error("Error while Regsitering User");
    }
};