var express = require("express");
var router = express.Router();
var Campground  = require("../models/campground");

//============================
// CAMPGROUND ROUTES
//============================

//INDEX GET - all campgrounds and displays them in campgrounds page
router.get("/", function(req, res){
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            //render index page with all campgrounds
            res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
        }
    });
});

//CREATE POST - route to add new campground to database
router.post("/", function(req, res){
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampGround = {name: name, image: image, description: description};
    
    //Create a new campground and save to the database
    Campground.create(newCampGround, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds/");
        }
    });
});

//NEW GET - form to add new camp ground
router.get("/new", function(req, res){
     res.render("campgrounds/new");
});

//SHOW  GET - request to show more info about one campground
//needs to be after campground/new or it will treat new as an id
router.get("/:id", function(req, res){
    
    //find campground by id that is passed in by the request
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err){
            console.log(err);
        } else {
            //render show template with found campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

module.exports = router;