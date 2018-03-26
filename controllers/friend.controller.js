const UserService = require('../services/user.service');

exports.getFriends = async function (req, res, next) {
    if (!req.user._id) return res.status(401).json({ "message": "Unauthorized Error" });
    try {
        console.log(req.query.search);
        if (req.query && req.query.search) {
            const friends = await UserService.searchFriendsByName(req.query.search);
            return res.status(200).json({ status: 200, data: friends, message: "Succesfully Recieved Friends" });
        } else {
            const friends = await UserService.getFriends();
            return res.status(200).json({ status: 200, data: friends, message: "Succesfully Recieved Friends" });
        }
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

