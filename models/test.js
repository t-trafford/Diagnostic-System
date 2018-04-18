var mongoose = require("mongoose");

//SCHEMA SETUP - For test menu
var testSchema = new mongoose.Schema({
    name: String,
    description: String,
    type: String,
    pretest: String,
    delivery: String,
    category: String
});

module.exports = mongoose.model("Test", testSchema);