const mongoose = require("mongoose");
const User = require('../models/user.model');

exports.registerUser = async function (user) {
    const newUser = new User({
        name: user.name,
        email: user.email,
    });
    newUser.setPassword(user.password);
    try {
        await newUser.save();
        const token = newUser.generateJwt();
        return token;
    } catch (e) {
        throw Error("Error while Registering User");
    }
};

exports.getFriends = async function (query) {
    try {
        const friends = await User.find(query, { name: 1, email: 1, _id: 1 });
        return friends;
    } catch (e) {
        throw Error("Error while getting friends");
    }
}

exports.searchFriendsByName = async function (searchTerm) {
    try {
        const friends = await User.find({ name: { $regex: `.*${searchTerm}.*`, $options: "i" } });
        return friends;
    } catch (e) {
        throw Error("Error while getting friends");
    }
}