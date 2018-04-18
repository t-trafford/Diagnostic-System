var express     = require("express"),
    router      = express.Router(),
    Test        = require("../models/test"),
    Appointment = require("../models/appointment");
    middleware  = require("../middleware");

//TEST MENU PAGE - Show list of test available
router.get("/testmenu", function (req, res) {
    //Get all tests from database
    Test.find({}, function (err, alltests) {
        if (err) {
            console.log(err);
        }
        else {
            //Render the test menu template
            res.render("testmenus/testmenu", { tests: alltests });
        }
    });
});


//NEW TEST ROUTE - show form to add new test
router.get("/testmenu/new", middleware.isLoggedIn, function (req, res) {
    res.render("testmenus/new");
});

//CREATE - add new test to database
router.post("/testmenu", middleware.isLoggedIn, function (req, res) {
    //get all the data from form 
    var name = req.body.name;
    var description = req.body.description;
    var type = req.body.type;
    var pretest = req.body.pretest;
    var delivery = req.body.delivery;
    var category = req.body.category;

    var newTest = { name: name, description: description, type: type, pretest: pretest, delivery: delivery, category: category };
    //create new test and add to db
    Test.create(newTest, function (err, newlyCreated) {
        if (err) {
            console.log(err);

        }
        //render the template testmenu 
        console.log(newlyCreated);
        req.flash("success", "Successfully added new test");
        res.redirect("testmenu");
    });
});

//SHOW ROUTE - Show information about particular test
router.get("/testmenu/:id", function (req, res) {
    //find the particular test by id
    Test.findById(req.params.id, function (err, foundTest) {
        if (err || !foundTest) {
            req.flash("error", "Test not found");
            console.log(err);
            res.redirect("back");
        }
        else {
            //Render the show template 
            res.render("testmenus/show", { test: foundTest });
        }
    });
});

//TEST EDIT ROUTE - Admin (edit the particular test)
router.get("/testmenu/:id/edit", middleware.isLoggedIn, function (req, res) {
    //Find the test by id
    Test.findById(req.params.id, function (err, foundTest) {
        if (err || !foundTest) {
            req.flash("error", "Test not found");
            console.log(err);
            res.redirect("back");
        }
        else {
            //Render the edit template
            res.render("testmenus/edit", { test: foundTest });
        }
    });
});

//UPDATE ROUTE - update the edited test
router.put("/testmenu/:id", middleware.isLoggedIn, function (req, res) {
    //Find and update the correct test
    Test.findByIdAndUpdate(req.params.id, req.body.test, function (err, updatedTest) {
        if (err) {
            res.redirect("/testmenu");
        }
        else {
            //redirect to show page
            res.redirect("/testmenu/" + req.params.id);
            console.log(updatedTest);
        }
    });
});

router.delete("/testmenu/:id", middleware.isLoggedIn, function (req, res) {
    Test.findByIdAndRemove(req.params.id, function (err, deletedTest) {
        if (err) {
            console.log(err);
        }
        else {
            req.flash("success", "Test deleted successfully");
            res.redirect("/testmenu");
        }
    });
});

router.get("/testmenu/:id/appointment/new", function(req, res) {
    Test.findById(req.params.id, function(err, foundTest) {
       if(err) {
           console.log(err);
       } 
       else {   
           res.render("testmenus/book", {test: foundTest});
       }
    });
});

router.post("/testmenu/:id/appointment", function(req, res) {
    Test.findById(req.params.id, function(err, foundTest) {
        if(err) {
            console.log(err);
        }
        else {
            Appointment.create(req.body.book, function(err, createdAppointment) {
               if(err) {
                   console.log(err);
               } 
               else {
                   //Add username and id to appointment
                   createdAppointment.author.id = req.user._id;
                   createdAppointment.author.username = req.user.username;
                   createdAppointment.tests.push(foundTest);
                   createdAppointment.save();
                   console.log(createdAppointment);
                   req.flash("success", "Appointment booked!");
                   res.redirect("/testmenu");
               }
            });
        }
    });
});

module.exports = router;