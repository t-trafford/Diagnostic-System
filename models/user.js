var mongoose                = require("mongoose");
var passportLocalMongoose   = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    name: String,
    address: String,
    phonenumber: Number,
    username: String,
    password: String,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);