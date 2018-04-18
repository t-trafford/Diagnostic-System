var express     = require("express"),
    router      = express.Router(),
    Doctor      = require("../models/doctor"),
    middleware  = require("../middleware"),
    passport    = require("passport");

//ADD DOCTOR ROUTE
router.get("/doctors/new", middleware.isLoggedIn, function (req, res) {
    res.render("doctors/newdoctor");
});

router.post("/doctors", middleware.isLoggedIn, function (req, res) {
    //Create New doctor
    Doctor.register(new Doctor({ name: req.body.name, speciality: req.body.speciality, role: req.body.role, username: req.body.username }), req.body.password, function (err, newDoctor) {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        passport.authenticate("doctor")(req, res, function () {
            req.flash("success", "Successfully added new doctor into system");
            return res.redirect("/");
        });
    });
});


//ALL DOCTORS ROUTE - Show list of all the available doctors 
router.get("/doctors", middleware.isLoggedIn, function(req, res) {
    //Find all the doctors in database
    Doctor.find({}, function(err, allDoctors) {
       if(err) {
           console.log(err);
           res.redirect("back");
       } 
       else {
           //Render the correct template
           res.render("doctors/doctor", {doctors: allDoctors});
       }
    }); 
});


//EDIT DOCTOR ROUTE - Show info about particular doctor
router.get("/doctors/:id/edit", middleware.isLoggedIn, function(req, res) {
    //Find doctor by id
   Doctor.findById(req.params.id, function(err, foundDoctor) {
      if(err || !foundDoctor) {
          req.flash("error", "Doctor not present in system");
          console.log(err);
          res.redirect("back");
      } 
      else {
          //Render the template
          res.render("doctors/edit", {doctor: foundDoctor});
      }
   }); 
});

//DOCTOR EDIT POST ROUTE - update the following doctor in database
router.put("/doctors/:id", middleware.isLoggedIn, function(req, res) {
   Doctor.findByIdAndUpdate(req.params.id, req.body.doctor, function(err, updatedDoctor) {
      if(err) {
          console.log(err);
      } 
      else {
          //render the template
          res.redirect("/doctors");
      }
   }); 
});
module.exports = router;