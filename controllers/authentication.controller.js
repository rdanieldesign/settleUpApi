var UserService = require("../services/user.service");

exports.registerUser = async function (req, res, next) {
    var newUser = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
    }
    try {
        var token = await UserService.registerUser(newUser);
        return res.status(200).json({ status: 200, data: {token}, message: "Succesfully Registered User" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: "User Registration was Unsuccesfull" })
    }
}

exports.login = async function (req, res, next) {
    try {
        var token;
        var message;
        await passport.authenticate('local', function (err, user, info) {
            // If a user is found
            if (user) {
                token = user.generateJwt();
            } else {
                // If user is not found
                message = info
            }
        })(req, res);
        if (user) return res.status(200).json({ status: 200, data: { token }, message: "Succesfully Logged In" });
        return res.status(401).json({ status: 401, message });
    } catch (e) {
        return res.status(404).json(e);
    }
}