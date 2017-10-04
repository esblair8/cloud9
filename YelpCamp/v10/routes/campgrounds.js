var express = require("express");
var router = express.Router();
var Campground  = require("../models/campground");

//============================
// CAMPGROUND ROUTES
//============================

//INDEX GET - ALL CAMPGROUNDS AND DISPLAYS THEM IN CAMPGROUNDS PAGE
router.get("/", function(req, res){
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        }//if
        else{
            //RENDER INDEX PAGE WITH ALL CAMPGROUNDS
            res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
        }//else
    });//callback
});//callback

//CREATE - POST - ROUTE TO ADD NEW CAMPGROUND TO DATABASE
router.post("/", isLoggedIn, function(req, res){
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    
    var author = {
        id: req.user._id,
        username: req.user.username
    };//author
    
    var newCampGround = {name: name, image: image, description: description, author: author};
    
    //CREATE A NEW CAMPGROUND AND SAVE TO THE DATABASE
    Campground.create(newCampGround, function(err, newlyCreated){
        if(err){
            console.log(err);
        }//if
        else{
            //REDIRECT BACK TO CAMPGROUNDS PAGE
            res.redirect("/campgrounds/");
        }//else
    });//callback
});//callback

//NEW - GET - FORM TO ADD NEW CAMP GROUND
router.get("/new", isLoggedIn, function(req, res){
     res.render("campgrounds/new");
});

//SHOW  GET - REQUEST TO SHOW MORE INFO ABOUT ONE CAMPGROUND
//NEEDS TO BE AFTER CAMPGROUND/NEW OR IT WILL TREAT NEW AS AN ID
router.get("/:id", function(req, res){
    
    //FIND CAMPGROUND BY ID THAT IS PASSED IN BY THE REQUEST
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err){
            console.log(err);
        }//if
        else {
            //RENDER SHOW TEMPLATE WITH FOUND CAMPGROUND
            res.render("campgrounds/show", {campground: foundCampground});
        }//else
    });//callback
});//callback


//EDIT - GET REQUEST TO SHOW EDITING FORM
                        //middleware
router.get("/:id/edit", checkCampgroundOwnership, function(req, res){
       Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
    });//callback 
});//callback 

//UPDATE - UPDATE DATABASE WITH EDIT CHANGES
router.put("/:id", checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        }//if
        else{
             res.redirect("/campgrounds/" + req.params.id);
        }//else
    });//callback 
});//callback 

//DESTROY - DELETE A CAMPGROUND
router.delete("/:id", checkCampgroundOwnership, function(req,res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       }//if
       else{
           res.redirect("/campgrounds");
       }//else
   });//callback
});//callback

//============================
//MIDDLEWARE FUNCTIONS
//============================

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }//if
    res.redirect("/login");
}//isLoggedIn

function checkCampgroundOwnership(req, res, next){
    //IS USER LOGGED IN
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            }//if
            else{
                //IF USER IS LOGGED IN, DOES OWNER OWN CAMPGROUND
                if(foundCampground.author.id.equals(req.user._id)){
                   // move to next callback function
                   next();
                }//if
                else{
                    //send don't have permissions
                    res.redirect("back");
                }//else
            }//else
        });//callback
    }//if
    else{
          //IF NOT REDIRECT TO LOG IN PAGE
        res.redirect("back");
    }//else
}//checkCampgroundOwnership
    
module.exports = router;