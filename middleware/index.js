var Test = require("../models/test");
var User = require("../models/user");
var Doctor = require("../models/doctor");

var middlewareobj = {};

middlewareobj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.username === 'akshay14021') {
            return next();
        }
        req.flash("error", "You are not authorized to do that");
        res.redirect("/");
    }
    else {
        req.flash("error", "You need to be admin to do that, Sending you back!");
        res.redirect("back");
    }
};

module.exports = middlewareobj;