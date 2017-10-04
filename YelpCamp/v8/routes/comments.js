var express     = require("express");
var router      = express.Router({mergeParams: true});
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");

//============================
// COMMENT ROUTES
//============================

//NEW GET - COMMENTS form to add new camp ground
router.get("/new", isLoggedIn, function(req, res){
     Campground.findById(req.params.id, function(err, campground){
         if(err){
             console.log(err);
         }
         else{
            res.render("comments/new", {campground: campground});
         }
     });
});

//NEW GET - COMMENTS form to add new camp ground
router.post("/", isLoggedIn, function(req, res){
    //lookup campground by id
    Campground.findById(req.params.id, function(err, campground){
         if(err){
             console.log(err);
            res.redirect("/campgrounds");
         }
         else{
            //create new comment
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               }//if
               else{
                   //get logged in user details
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   //save them to collection
                   comment.save();
                   //add comment reference to campground
                   campground.comments.push(comment);
                   //save campground
                   campground.save();
                   //redirect campground show page
                   res.redirect("/campgrounds/" + campground._id);
               }//else
           });
         }
     });
});

//============================
//middleware function to check 
//if user is logged in 
//============================
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;