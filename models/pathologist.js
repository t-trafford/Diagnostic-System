var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var pathologistSchema = new mongoose.Schema({
    name: String,
    role: String,
    username: String,
    password: String    
});

pathologistSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("Pathologist", pathologistSchema);