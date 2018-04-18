var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var doctorSchema = new mongoose.Schema({
    name: String,
    speciality: String,
    role: String,
    username: String,
    password: String
});

doctorSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Doctor", doctorSchema);