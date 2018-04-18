var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user"),
    Doctors     = require("../models/doctor");


//LANDING PAGE - Homepage for Star Labs
router.get("/", function (req, res) {
    res.render("landing");
});

//==========//
//AUTH ROUTE//
//==========//

//LOGIN ROUTE - Show Login Form
router.get("/login", function (req, res) {
    res.render("login");
});

//HANDLING LOGIN LOGIC
router.post("/login", passport.authenticate(["user", "doctor", "pathologist"],
    {
        failureFlash: "Invalid Username or Password",
        successRedirect: "/",
        failureRedirect: "/login"
    }), function (req, res) {
    });



//REGISTER ROUTE - Show registration form
router.get("/register", function (req, res) {
    res.render("register");
});

//HANDLING REGISTRATION LOGIC
router.post("/register", function (req, res) {
    //Create new user
    User.register(new User({ name: req.body.name, address: req.body.adress, phonenumber: req.body.phonenumber, username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            req.flash("error", "Username already exist!");
            console.log(err);
            res.redirect("back");
        }
        passport.authenticate("user")(req, res, function () {
            req.flash("success", "Successfully Signed up! Nice to meet you " + user.username);
            res.redirect("/");
        });
    });
});

//HANDLING LOGOUT LOGIC
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});

module.exports = router;