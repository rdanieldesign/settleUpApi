var UserService = require("../services/user.service");
var passport = require("passport");

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

exports.login = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
}