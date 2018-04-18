var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Test            = require("./models/test"),
    User            = require("./models/user"),
    Doctor          = require("./models/doctor"),
    Pathologist     = require("./models/pathologist"),
    Appointment     = require("./models/appointment"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    flash           = require("connect-flash"),
    methodOverride  = require("method-override");


//REQUIRING ROUTES
var testmenuRoute    = require("./routes/testmenu");
var doctorRoute      = require("./routes/doctors");
var pathologistRoute = require("./routes/pathologists");
var indexRoute       = require("./routes/index");
var patientRoute     = require("./routes/patients");

//DB CONNECTION
mongoose.connect("mongodb://localhost/star_lab");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "Star Lab is one stop solution",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use('user', new localStrategy(function (username, password, done) {
    User.findOne({
        username: username
    }, function (err, user) {
        // ...
        return done(null, user);
    });
}));

passport.use('doctor', new localStrategy(function (username, password, done) {
    Doctor.findOne({
        username: username
    }, function (err, user) {
        // ...
        return done(null, user);
    });
}));

passport.use('pathologist', new localStrategy(function(username, password, done) {
    Pathologist.findOne({
        username: username
    }, function(err, user) {
       // ...
       return done(null, user); 
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) done(err);
        if (user) {
            done(null, user);
        } else if(!user) {
            Doctor.findById(id, function (err, user) {
                if (err) done(err);
                if(user) {
                    done(null, user);
                } else {
                    Pathologist.findById(id, function(err, user) {
                       if(err) done(err);
                       done (null, user); 
                    });
                }
            });
        }
    });
});

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});

app.use(testmenuRoute);
app.use(doctorRoute);
app.use(pathologistRoute);
app.use(indexRoute);
app.use(patientRoute);

//SERVER CONFG
app.listen(3000, process.env.IP, function(){
    console.log("SERVER IS UP! HAPPY CODING!");
});