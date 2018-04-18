var express     = require("express");
var router      = express.Router();
var User        = require("../models/user");
var Appointment = require("../models/appointment"); 

router.get("/patients/:id", function(req, res) {
   User.findById(req.params.id, function(err, foundUser) {
      if(err) {
          console.log(err);
      } 
      else {
          res.render("patients/show", {user: foundUser});
      }
   }); 
});


// router.get("/patients/:id/appointment", function(req, res) {
//    User.findById(req.params.id, function(err, foundUser) {
//       if(err) {
//           console.log(err);
//       }
//       else {
//         res.render("patients/appointmentlist", {user: foundUser});
//     }
//    });
// });


router.get("/patients/:id/appointment", function(req, res) {
    Appointment.find({}, function(err, allAppointment) {
       if(err) {
           console.log(err);
           res.redirect("back");
       }
       else {
         res.render("patients/appointmentlist", {appointments: allAppointment});
     }
    });
 });




module.exports = router;