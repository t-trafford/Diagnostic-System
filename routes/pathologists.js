var express = require("express");
var Pathologist = require("../models/pathologist");
var router = express.Router();
var passport = require("passport");
var middleware = require("../middleware");


//NEW PATHOLOGIST ROUTE - Show form to add new pathologist into system
router.get("/pathologist/new", middleware.isLoggedIn, function(req, res) {
   res.render("pathologists/newpathologist"); 
});

//POST ROUTE - Post logic route
router.post("/pathologist", middleware.isLoggedIn, function(req, res) {
    Pathologist.register(new Pathologist({name: req.body.name, role: req.body.role, username: req.body.username}), req.body.password, function(err, newpathologist) {
       if(err) {
           console.log(err);
           res.redirect("back");
       } 
       passport.authenticate("pathologist")(req, res, function() {
           req.flash("success", "Successfully added new pathologist");
           res.redirect("/");
       });
    }); 
});


//ALL PATHOLOGIST ROUTE - Show list of available pathologist in system
router.get("/pathologist", middleware.isLoggedIn, function(req, res) {
   //Find all the pathologist from db
   Pathologist.find({}, function(err, allPathologist) {
      if(err) {
          req.flash("error", "Not found");
          console.log(err);
          res.redirect("back");
      } 
      else {
          //render the template
          res.render("pathologists/pathologist", {pathologists: allPathologist});
      }
   }); 
});

//EDIT ROUTE - Show form to edit pathologist

router.get("/pathologist/:id/edit", middleware.isLoggedIn, function(req, res) {
   //Find the pathologist by id from db
    Pathologist.findById(req.params.id, function(err, foundPathologist) {
      if(err || !foundPathologist) {
          req.flash("error", "Pathologist is not in system");
          console.log(err);
          res.redirect("back");
      } 
      else {
          //Render the template
          res.render("pathologists/edit", {pathologist: foundPathologist});
      }
   }); 
});

//POST ROUTE FOR EDIT - Logic for edit route
router.put("/pathologist/:id", middleware.isLoggedIn, function(req, res) {
   Pathologist.findByIdAndUpdate(req.params.id, req.body.pathologist, function(err, updatedPathologist) {
      if(err) {
          console.log(err);
          res.redirect("back");
      } 
      else {
          res.redirect("/pathologist");
      }
   }); 
});
module.exports = router;