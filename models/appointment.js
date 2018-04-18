var mongoose = require("mongoose");

var appointmentSchema = new mongoose.Schema({
    date: Date,
    time: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    },
    tests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test"
        }
    ]
    
});

module.exports = mongoose.model("Appointment", appointmentSchema);